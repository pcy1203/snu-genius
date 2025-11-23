import json
from openai import OpenAI
import faiss
import numpy as np
from typing import List, Dict

client = OpenAI(api_key="")

# -----------------------------
# 1) RAG: 문서 로드 + 임베딩 생성
# -----------------------------

texts = []
doc_paths = [
    # "documents/ling.md",
    "documents/lifesci.md",
    # "documents/engedu.md",
    "documents/comp.md"            
]
for doc_path in doc_paths:
    with open(doc_path, "r", encoding="utf-8") as f:
        texts.append(f.read())

myprofile = ""
grad_path = "graduation/grad_lifesci_X.txt"
with open(grad_path, "r", encoding="utf-8") as f:
    myprofile = f.read()

# 예: requirement 문서들
DOCUMENTS = [
    {"id": i, "text": texts[i]} for i in range(len(texts))
]

# 문서 임베딩 생성
def embed(text: str) -> np.ndarray:
    res = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return np.array(res.data[0].embedding, dtype="float32")

EMBED_DIM = 1536
index = faiss.IndexFlatL2(EMBED_DIM)
doc_embeddings = []

for doc in DOCUMENTS:
    vec = embed(doc["text"])
    doc_embeddings.append(vec)
    index.add(np.array([vec]))

# -------------------------------------
# 2) RAG 검색: 가장 관련 있는 문서 찾기
# -------------------------------------
def search_documents(query: str, k: int = 1):
    query_vec = embed(query)
    D, I = index.search(np.array([query_vec]), k)
    results = []
    for idx in I[0]:
        results.append(DOCUMENTS[idx])
    return results


# -----------------------------
# 3) LLM 호출 + 프롬프트 생성
# -----------------------------
def build_prompt(query_type: str, content: str, rag_docs: List[Dict]):
    context_text = "\n\n".join([f"[규정 {d['id']}]\n{d['text']}" for d in rag_docs])

    return f"""
당신은 대학 학사/졸업 규정 상담을 도와주는 AI 어드바이저입니다.
아래는 사용자의 질문입니다. 제공된 규정을 참고하여 정확하게 답변하세요.
(잘 모르는 답변은 obscure 태그를 붙이고 별도로 문의할 수 있도록 합니다.)

[질문 유형]
{query_type}

[질문 내용]
{content}

[질문 정책]
만약 질문이 '이수 규정 하나씩 점검하기'라면, 이수 규정을 하나씩 점검하는 질문을 사용자와 주고받으며 졸업 시뮬레이션을 합니다.
만약 질문이 '미이수 내용만 빠르게 확인하기'라면, 이수 규정 전체를 확인하고 미이수 내용만 요약하여 알려줍니다.

[현재 사용자의 이수 현황]
{myprofile}

[검색된 관련 규정]
{context_text}

[출력 형식]
질문에 대한 답변은 'answer', 답변이 모호한 경우 'obscure', 졸업 시뮬레이션 종류 후에는 'recommendation'을 태그로 붙여주세요.
---

## 출력 형식(JSON)
- answer: 실제 답변
- tag: 'answer' | 'obscure' | 'recommendation'
- requirement: 규정 id (해당하는 경우만)

다른 말은 하지 말고 JSON만 출력하세요.
"""


# -----------------------------
# 4) ask_llm 수정 버전
# -----------------------------
def ask_llm(query_type: str, content: str) -> dict:
    # 1) RAG검색
    related_docs = search_documents(content, k=1)
    related_texts = "\n".join([d["text"] for d in related_docs])

    # 2) 프롬프트 생성
    prompt = build_prompt(query_type, content, related_docs)

    # 3) OpenAI Chat Completion 호출
    res = client.chat.completions.create(
        model="gpt-4.1",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
    )

    # 4) 모델이 JSON 형태라고 가정하고 파싱
    try:
        output = json.loads(res.choices[0].message.content)
    except:
        output = {
            "answer": res.choices[0].message.content,
            "tag": "answer",
            "requirement": None
        }

    # 5) answer 리스트 처리 + 공백/이모지 제거
    if isinstance(output.get("answer"), list):
        output["answer"] = "\n".join([a for a in output["answer"]])
    else:
        output["answer"] = output.get("answer", "")

    # 6) tag 기본값 지정
    if "tag" not in output or output["tag"] is None:
        output["tag"] = "answer"

    # 7) 참고한 관련 규정 텍스트 추가
    output["related_text"] = related_texts

    return output





"""
  [Input]
  1) type
    - 'inquiry' : 
    - 'progress' : 졸업 시뮬레이션
    - 'checklist' : 이수 규정 하나씩 점검하기
    - 'quick' : 미이수 내용만 빠르게 확인하기
  2) content : 질문 내용
  3) 유저에 대한 정보 -> 이 부분은 먼저 넣어주시면 추후 백엔드를 수정하겠습니다!

  [Output]
  1) answer : 답변 내용
  2) tag : 태그
    - 'answer' : 답변
    - 'obscure' : 답변 불가, 문의 메일 작성
    - 'recommendation' : 수강 계획 추천 받기
  3) requirement : 관련 규정 (id)
"""

# def ask_llm(type: str, content: str) -> str:
#     return {
#         "answer": f"""질문 유형 : {type} / 질문한 내용 : {content}
# AI가 답변을 생성하여 전달해줍니다.""",
#         "tag": "answer" if content == "답변" else ("obscure" if content == "답변 불가" else None),
#         "requirement": 1 if content == "규정" else None,
#     }
# routers/question.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Question, MyQuestion
from schemas import QuestionCreate
from utils.llm import ask_llm
from utils.email import send_email
from utils.recommendation import generate_recommendation
from datetime import datetime
import re

router = APIRouter(prefix="/api/question", tags=["question"])

def clean_text(text: str) -> str:
    """
    문자열에서 모든 이모지 제거 + 앞뒤 공백 정리
    """
    if not text:
        return ""

    # 1. 이모지 제거
    emoji_pattern = re.compile(
        "["
        "\U0001F600-\U0001F64F"  # emoticons
        "\U0001F300-\U0001F5FF"  # symbols & pictographs
        "\U0001F680-\U0001F6FF"  # transport & map
        "\U0001F1E0-\U0001F1FF"  # flags
        "\U00002700-\U000027BF"  # dingbats
        "\U000024C2-\U0001F251"
        "]+",
        flags=re.UNICODE
    )
    text_no_emoji = emoji_pattern.sub("", text)

    # 2. 연속 공백 제거
    text_no_emoji = re.sub(r"\s+", " ", text_no_emoji)

    # 3. 앞뒤 공백 제거
    return text_no_emoji.strip()


# LLM 답변 받기
@router.post("/llm")
def ask_question(payload: QuestionCreate, db: Session = Depends(get_db)):
    answer = ask_llm(payload.type, payload.content)

    new_q = Question(
        user_id=payload.user_id,
        type=payload.type,
        content=clean_text(payload.content),
        answer="\n".join(answer["answer"]),
        relevant_requirement=payload.relevant_requirement
    )
    db.add(new_q)
    db.commit()
    db.refresh(new_q)

    return {"question": new_q, "llm_answer": answer["answer"], "tag": answer["tag"], "requirement": answer.get("related_text")}


# 추천 받기
@router.get("/recommendation")
def get_recommendation(user_id: int, db: Session = Depends(get_db)):
    result = generate_recommendation(user_id, db)
    return {"recommendation": result}


# 이메일 전송
@router.post("/email")
def send_question_email(to_email: str, subject: str, body: str):
    send_email(to_email, subject, body)
    return {"status": "sent"}

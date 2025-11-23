[
  {
    "table_id": "TABLE_ID_RULE_DECISION_FLOW",
    "document_type": "TABLE_HTML",
    "source_info": "졸업 사정 판단 순서도 (Decision Logic)",
    "llm_generated_description": "LLM 및 사용자가 졸업 요건을 판단할 때 따라야 하는 4단계 알고리즘입니다. 반드시 순서대로 적용해야 정확한 결과를 얻을 수 있습니다.",
    "content_html": "<table><thead><tr><th>단계 (Step)</th><th>판단 항목 (Check Item)</th><th>적용 로직 (Action Logic)</th><th>참조 테이블 (Ref ID)</th></tr></thead><tbody><tr><td><b>Step 1</b></td><td><b>학번 구간 확인</b><br>(Cohort Check)</td><td>입학년도에 따라 <b>전공 필수 리스트(A/B/C)</b>와 <b>기초과학 필수 여부</b>를 확정한다.<br><i>예: 21학번 → List B, 기초과학 선택</i></td><td>[TABLE_ID_GRADUATION_MATRIX_17_24]<br>[TABLE_ID_CORE_LIST_VARIANTS_FULLNAME]</td></tr><tr><td><b>Step 2</b></td><td><b>전공 형태 확인</b><br>(Major Status)</td><td>본인의 전공 유형(심화/병행/복수)에 따라 <b>목표 이수 학점(60 vs 39)</b>을 설정한다.<br><i>예: 심화 → 60학점, 복수 → 39학점</i></td><td>[TABLE_ID_GRADUATION_MATRIX_17_24]<br>[TABLE_ID_CREDIT_CALCULATOR]</td></tr><tr><td><b>Step 3</b></td><td><b>필수 과목 매칭</b><br>(Match Core)</td><td>Step 1에서 확정된 리스트와 수강 내역을 대조하여 <b>Pass/Fail</b>을 판정한다.<br><i>주의: 학번별로 인정되는 과목이 다르므로 과목명 일치 여부 확인 필수.</i></td><td>[TABLE_ID_CORE_LIST_VARIANTS_FULLNAME]</td></tr><tr><td><b>Step 4</b></td><td><b>졸업 논문 자격</b><br>(Thesis Prereq)</td><td>논문연구 수강 전, <b>연구 참여 2회</b> 요건이 충족되었는지 검증한다.<br><i>복수전공생도 필수 체크.</i></td><td>[TABLE_ID_THESIS_PREREQ_DETAIL]</td></tr></tbody></table>"
  },
  {
    "table_id": "TABLE_ID_GLOBAL_GATES",
    "document_type": "TABLE_HTML",
    "source_info": "졸업 필수 5대 관문 (전 학번 공통)",
    "llm_generated_description": "졸업을 위해 반드시 통과해야 하는 기본 요건입니다. 하나라도 미충족 시 전공 학점과 무관하게 졸업이 불가합니다.",
    "content_html": "<table><thead><tr><th>Gate ID</th><th>항목</th><th>요건 (Requirement)</th><th>상세 로직 (Logic)</th></tr></thead><tbody><tr><td>G_CREDIT</td><td>총 이수학점</td><td><b>130학점</b> 이상</td><td>전공 + 교양 + 일반선택 합계 &ge; 130</td></tr><tr><td>G_GPA</td><td>평점 평균</td><td>전체 2.0 이상 AND 전공 2.0 이상</td><td>(Total_GPA &ge; 2.0) AND (Major_GPA &ge; 2.0)</td></tr><tr><td>G_ENG</td><td>영어 강의</td><td>총 3강좌 이상 (전공 1개 필수)</td><td>Count(Eng_All) &ge; 3 AND Count(Eng_Major) &ge; 1</td></tr><tr><td>G_THESIS</td><td>졸업 논문</td><td>논문연구 수강 + 심사 합격(S)</td><td>Pass(생명과학학위논문연구) == True</td></tr><tr><td>G_TERM</td><td>재학 연한</td><td>등록 8회 이상</td><td>등록학기 &ge; 8</td></tr></tbody></table>"
  },
  {
    "table_id": "TABLE_ID_GRADUATION_MATRIX_17_24",
    "document_type": "TABLE_HTML",
    "source_info": "학번별/전공상태별 졸업 이수 학점 매트릭스 (2017~2024)",
    "llm_generated_description": "Step 1과 Step 2에서 사용하는 핵심 기준표입니다. 학번과 전공 형태에 따른 학점 및 필수 리스트 ID를 정의합니다.",
    "content_html": "<table><thead><tr><th>학번 구간</th><th>전공 형태</th><th>총 전공 학점</th><th>전공 필수 (Core)</th><th>전공 선택</th><th>적용 필수 과목 리스트 (Core List ID)</th><th>기초과학(물/화) 필수 여부</th></tr></thead><tbody><tr><td rowspan='3'><b>2023 ~ 2024</b></td><td>심화전공 (단일)</td><td>60</td><td>19</td><td>41</td><td rowspan='3'><b>[LIST_CORE_A_23_24]</b><br>(생태학 포함, 6택4)<br>+ 3개 분야별 1과목 이상</td><td rowspan='3'><b>선택 (Optional)</b><br>※ 미이수 가능</td></tr><tr><td>타전공병행</td><td>39</td><td>19</td><td>20</td></tr><tr><td>복수전공</td><td>39</td><td>19</td><td>20</td></tr><tr><td rowspan='3'><b>2019 ~ 2022</b></td><td>심화전공 (단일)</td><td>60</td><td>19</td><td>41</td><td rowspan='3'><b>[LIST_CORE_B_19_22]</b><br>(생물다양성 포함, 6택4)<br>+ 3개 분야별 1과목 이상</td><td rowspan='3'><b>선택 (Optional)</b><br>※ 미이수 가능</td></tr><tr><td>타전공병행</td><td>39</td><td>19</td><td>20</td></tr><tr><td>복수전공</td><td>39</td><td>19</td><td>20</td></tr><tr><td rowspan='3'><b>2017 ~ 2018</b></td><td>심화전공 (단일)</td><td>60</td><td>20</td><td>40</td><td rowspan='3'><b>[LIST_CORE_C_17_18]</b><br>(야외실습 포함 7과목)<br><b>전체 필수 이수</b></td><td rowspan='3'><b>절대 필수 (Mandatory)</b><br>물리학 1,2 및 화학 1,2 이수 필수</td></tr><tr><td>타전공병행</td><td>39</td><td>20</td><td>19</td></tr><tr><td>복수전공</td><td>39</td><td>20</td><td>19</td></tr></tbody></table>"
  },
  {
    "table_id": "TABLE_ID_CORE_LIST_VARIANTS_FULLNAME",
    "document_type": "TABLE_HTML",
    "source_info": "학번별 전공 필수 과목 리스트 (정식 명칭)",
    "llm_generated_description": "Step 3에서 사용하는 전공 필수 과목 상세 리스트입니다. 과목명 풀네임(Full Name)을 사용합니다.",
    "content_html": "<table><thead><tr><th>리스트 ID</th><th>대상 과목 목록 (Items)</th><th>이수 규칙 (Rule)</th></tr></thead><tbody><tr><td><b>[LIST_CORE_A_23_24]</b></td><td>①생화학 1 ②생화학 2 ③세포생물학 ④분자생물학 ⑤유전학 ⑥<b>생태학</b></td><td><b>위 6과목 중 4과목 이상 필수 이수</b><br>(4과목 초과 시 전공선택 인정)</td></tr><tr><td><b>[LIST_CORE_B_19_22]</b></td><td>①생화학 1 ②생화학 2 ③세포생물학 ④분자생물학 ⑤유전학 ⑥<b>생물다양성과 환경</b></td><td><b>위 6과목 중 4과목 이상 필수 이수</b><br>(생물학야외실습 전필 해제됨)</td></tr><tr><td><b>[LIST_CORE_C_17_18]</b></td><td>①생화학 1 ②생화학 2 ③세포생물학 ④분자생물학 ⑤유전학 ⑥<b>생물다양성과 환경</b> ⑦<b>생물학야외실습</b></td><td><b>7과목 전체 필수 이수</b><br>(선택권 없음, 총 20학점)</td></tr></tbody></table>"
  },
  {
    "table_id": "TABLE_ID_THESIS_PREREQ_DETAIL",
    "document_type": "TABLE_HTML",
    "source_info": "졸업논문 연구 수강 자격 및 인정 로직",
    "llm_generated_description": "Step 4에서 사용하는 졸업논문 선수 요건입니다. 연구 참여 횟수, 인정 가능한 과목 조합, 동시 수강 제한 사항을 정의합니다.",
    "content_html": "<table><thead><tr><th>구분</th><th>요건 (Requirement)</th><th>상세 로직 (Logic)</th></tr></thead><tbody><tr><td><b>선수 과목</b></td><td>생명과학전공실험 1, 2 이수</td><td>반드시 성적 취득(S 또는 D- 이상) 완료해야 함</td></tr><tr><td><b>연구 참여 횟수</b></td><td>총 <b>2회 이상</b> 필수</td><td><b>[인정 조합]</b><br>1. 생명과학연구실습 2회<br>2. 생명과학연구실습 1회 + 자연대 인턴십 1회<br>3. 자연대 인턴십 2회</td></tr><tr><td><b>동시 수강 제한</b></td><td>학기당 1회만 인정</td><td>한 학기에 '연구실습'과 '인턴십'을 동시에 수강하더라도 <b>1회 실적으로만 간주</b>함</td></tr></tbody></table>"
  },
  {
    "table_id": "TABLE_ID_MAJOR_FIELD_CHECK_FULL",
    "document_type": "TABLE_HTML",
    "source_info": "전공 이수 3개 분야 필수 이수제 상세",
    "llm_generated_description": "주전공 및 복수전공 학생은 전공 과목 이수 시, 아래 3개 분야(분자세포/개체/생물다양성)에 해당하는 수업을 각각 최소 1개씩 포함해야 합니다.",
    "content_html": "<table><thead><tr><th>분야 (Field)</th><th>대표 교과목 예시 (Examples)</th><th>비고</th></tr></thead><tbody><tr><td><b>분자세포생물학</b></td><td>생화학 1, 생화학 2, 세포생물학, 분자생물학, 면역학, 구조생물학, 생물물리학 등</td><td rowspan='3'><b>각 분야별 1과목 이상 이수 필수</b><br>(전공 필수 과목 포함하여 체크)<br>※ 미충족 시 졸업 불가</td></tr><tr><td><b>개체생물학</b></td><td>유전학, 미생물학, 신경생물학, 발생생물학, 동물생리학, 식물생리학 등</td></tr><tr><td><b>생물다양성</b></td><td>생태학, 진화생물학, 생물다양성과 환경, 생물분류학, 식물생리학, 동물행동학개론 등</td></tr></tbody></table>"
  }
]

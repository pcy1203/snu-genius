import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 1200px;
    min-height: calc(100vh - 60px);
    margin-left: calc(50vw - 600px);
`;

const ChatContainer = styled.div`
    width: 1000px;
    min-height: calc(100vh - 60px);
    margin: 0 auto;
    padding: 40px 0 120px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    position: relative;
`;

const MessageWrapper = styled.div<{ type: "user" | "bot" }>`
    display: flex;
    flex-direction: column;
    align-items: ${({ type }) => (type === "user" ? "flex-end" : "flex-start")};
`;

const MessageBox = styled.div<{ type: "user" | "bot" }>`
    max-width: 800px;
    padding: 15px 20px;
    font-size: 14px;
    line-height: 1.6;
    white-space: pre-line;
    align-self: ${({ type }) => (type === "user" ? "flex-end" : "flex-start")};
    background-color: ${({ type }) =>
        type === "user" ? "#eeeeee" : "#ffeaea"};
    color: #333;
`;

const TagContainer = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 10px;
    flex-wrap: wrap;
`;

const Tag = styled.button`
    background-color: #ffeaea;
    border: 1px solid #8F8F8F;
    border-radius: 20px;
    padding: 6px 15px;
    font-size: 12px;
    line-height: 15px;
    color: #333;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    &:hover {
        background-color: #ffc5c5ff;
        color: #333;
        font-weight: 600;
    }
    &:active {
        transform: scale(0.9);
    }
`;

const InlineButton = styled.a`
    display: inline-block;
    margin-left: 8px;
    padding: 3px 8px;
    background-color: #f0f0f0;
    border-radius: 20px;
    font-size: 10px;
    color: #333;
    text-decoration: none;
    border: 1px solid #8F8F8F;
    transition: all 0.1s ease-in-out;
    &:hover {
        background-color: #e0e0e0;
        color: #333;
        font-weight: 600;
    }
    &:active {
        transform: scale(0.9);
    }
`;

const InputWrapper = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    background-color: #f8f9ff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: center;
`;

const InputContainer = styled.div`
    width: 1000px;
    padding: 15px 20px;
    display: flex;
    align-items: center;
`;

const InputBox = styled.input`
    flex: 1;
    height: 45px;
    border-radius: 25px;
    border: none;
    padding: 0 20px;
    font-size: 14px;
    background-color: #e7e9ff;
    color: black;
    outline: none;
`;

const SendButton = styled.button`
    margin-left: 10px;
    width: 80px;
    height: 45px;
    border-radius: 25px;
    border: none;
    background-color: #99a8ff;
    color: white;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #7c8cff;
    }
`;

interface Message {
    type: "user" | "bot";
    text: string;
    tags?: string[];
    buttons?: { label: string; link: string }[];
}

export default function QuestionProgress() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      text: `안녕하세요, OOO님의 이수 현황을 확인해드리겠습니다.
이수 규정을 하나씩 점검하며 질문드릴까요, 
아니면 미이수 내용만 빠르게 확인해드릴까요? 아래 버튼 중 한 가지를 눌러주세요!`,
      tags: ["✍️ 이수 규정 하나씩 점검하기", "🏃‍♂️ 미이수 내용만 빠르게 확인하기"],
      buttons: [{ label: "교과목 목록", link: "" }],
    },
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botReply: Message = {
        type: "bot",
        text: `"${input}"에 대한 규정을 확인 중입니다.\n답변은 추후 제작 예정입니다.`,
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  return (
    <Container>
      <ChatContainer>
        {messages.map((msg, index) => (
          <MessageWrapper key={index} type={msg.type}>
            <MessageBox type={msg.type}>
              {msg.text}
              {msg.buttons?.map((btn, i) => (
                <InlineButton key={i} href={btn.link} target="_blank">
                  {btn.label}
                </InlineButton>
              ))}
            </MessageBox>
            {msg.tags && msg.tags.length > 0 && (
              <TagContainer>
                {msg.tags.map((tag, i) => (
                  <Tag key={i}>{tag}</Tag>
                ))}
              </TagContainer>
            )}
          </MessageWrapper>
        ))}
      </ChatContainer>
    
      <InputWrapper>
        <InputContainer>
            <InputBox
            type="text"
            placeholder="질문 사항을 입력해 주세요."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <SendButton onClick={handleSend}>전송</SendButton>
        </InputContainer>
      </InputWrapper>
    </Container>
  );
}
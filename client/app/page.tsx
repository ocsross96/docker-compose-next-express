'use client';
import React, { useState, FormEvent } from 'react';
import styles from '../styles/Home.module.css';

interface Chat {
  role: string;
  content: string;
}

export default function Home() {
  const [message, setMessage] = useState<string>('');
  const [chats, setChats] = useState<Chat[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const chat = async (
    e: FormEvent<HTMLFormElement>,
    message: string
  ): Promise<void> => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    window.scrollTo(0, 1e10);

    const msgs = [...chats];
    msgs.push({ role: 'user', content: message });
    setChats(msgs);

    setMessage('');

    const queryParams = new URLSearchParams({ q: message }).toString();

    try {
      const response = await fetch(`/api/chat?${queryParams}`);
      const { data } = await response.json();

      msgs.push({ role: 'AI', content: data });
      setChats(msgs);
      setIsTyping(false);
      window.scrollTo(0, 1e10);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.pageTitle}>Coral AI Chat </h1>

      <section>
        {chats && chats.length
          ? chats.map((chat, index) => (
              <p
                key={index}
                className={`${chat.role === 'user' ? styles.user_msg : ''}`}
              >
                <span>
                  <b>{chat.role.toUpperCase()}</b>
                </span>
                <span>:</span>
                <span>{chat.content}</span>
              </p>
            ))
          : ''}
      </section>

      <div className={`${isTyping ? '' : styles.hide}`}>
        <p>
          <i>{isTyping ? 'Typing' : ''}</i>
        </p>
      </div>

      <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </main>
  );
}

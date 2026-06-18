"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import styles from "./messages.module.css";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] =
    useState<Message | null>(null);

  /* Fetch messages */
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`
      );

      const data = await response.json();

      if (data.success) {
        setMessages(data.data);

        if (data.data.length > 0) {
          setSelectedMessage(data.data[0]);
        }
      }
    } catch (error) {
      console.log("Error fetching:", error);
    }
  };

  /* Mark read/unread */
  const toggleRead = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact/${id}/read`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === id
              ? { ...msg, read: !msg.read }
              : msg
          )
        );

        if (selectedMessage?._id === id) {
          setSelectedMessage({
            ...selectedMessage,
            read: !selectedMessage.read,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* Delete message */
  const deleteMessage = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        const updated = messages.filter(
          (msg) => msg._id !== id
        );

        setMessages(updated);

        if (selectedMessage?._id === id) {
          setSelectedMessage(updated[0] || null);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.messagesPage}>
      <div className={styles.header}>
        <div>
          <span className={styles.badge}>
            📩 Contact Messages
          </span>

          <h1 className={styles.heading}>
            Messages Management
          </h1>

          <p className={styles.description}>
            Manage all client inquiries.
          </p>
        </div>

        <div className={styles.totalCard}>
          <h2>{messages.length}</h2>
          <p>Total Messages</p>
        </div>
      </div>

      <div className={styles.messagesContainer}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h3>All Messages</h3>
          </div>

          <div className={styles.messageList}>
            {messages.map((msg) => (
              <div
                key={msg._id}
                onClick={() =>
                  setSelectedMessage(msg)
                }
                className={`${styles.messageCard}
                ${
                  selectedMessage?._id ===
                  msg._id
                    ? styles.active
                    : ""
                }`}
              >
                <div
                  className={styles.messageTop}
                >
                  <h4>{msg.name}</h4>

                  {!msg.read && (
                    <span
                      className={styles.unreadDot}
                    ></span>
                  )}
                </div>

                <p className={styles.subject}>
                  {msg.subject}
                </p>

                <span className={styles.date}>
                  {new Date(
                    msg.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className={styles.detailsPanel}>
          {selectedMessage ? (
            <>
              <div className={styles.detailsHeader}>
                <div>
                  <h2>
                    {selectedMessage.subject}
                  </h2>

                  <p>
                    From:
                    {selectedMessage.name}
                    (
                    {
                      selectedMessage.email
                    }
                    )
                  </p>
                </div>

                <div
                  className={styles.actionButtons}
                >
                  <button
                    onClick={() =>
                      toggleRead(
                        selectedMessage._id
                      )
                    }
                    className={styles.readBtn}
                  >
                    {selectedMessage.read
                      ? "Mark Unread"
                      : "Mark Read"}
                  </button>

                  <button
                    onClick={() =>
                      deleteMessage(
                        selectedMessage._id
                      )
                    }
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className={styles.messageBody}>
                <p>
                  {
                    selectedMessage.message
                  }
                </p>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <h2>No Message Selected</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Memo } from "@/types/memo";

interface MemoFormProps {
  memo?: Memo;
  onSave: (memo: Partial<Memo>) => void;
  onCancel: () => void;
}

export default function MemoForm({ memo, onSave, onCancel }: MemoFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (memo) {
      setTitle(memo.title);
      setContent(memo.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [memo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: memo?.id,
      title,
      content,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="メモの内容を入力してください"
          rows={10}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          保存
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
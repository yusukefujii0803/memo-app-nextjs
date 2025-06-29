"use client";

import { useState, useEffect } from "react";
import { Memo } from "@/types/memo";
import MemoList from "@/components/MemoList";
import MemoForm from "@/components/MemoForm";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Home() {
  const [memos, setMemos, isLoaded] = useLocalStorage<Memo[]>("memos", []);
  const [selectedMemo, setSelectedMemo] = useState<Memo | undefined>();
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveMemo = (memoData: Partial<Memo>) => {
    if (memoData.id) {
      const updatedMemos = memos.map((memo) =>
        memo.id === memoData.id
          ? {
              ...memo,
              title: memoData.title || "",
              content: memoData.content || "",
              updatedAt: new Date(),
            }
          : memo
      );
      setMemos(updatedMemos);
    } else {
      const newMemo: Memo = {
        id: Date.now().toString(),
        title: memoData.title || "",
        content: memoData.content || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setMemos([newMemo, ...memos]);
    }
    setIsEditing(false);
    setSelectedMemo(undefined);
  };

  const handleDeleteMemo = (id: string) => {
    if (window.confirm("このメモを削除しますか？")) {
      setMemos(memos.filter((memo) => memo.id !== id));
      if (selectedMemo?.id === id) {
        setSelectedMemo(undefined);
        setIsEditing(false);
      }
    }
  };

  const handleSelectMemo = (memo: Memo) => {
    setSelectedMemo(memo);
    setIsEditing(true);
  };

  const handleNewMemo = () => {
    setSelectedMemo(undefined);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedMemo(undefined);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">メモ帳</h1>
            <button
              onClick={handleNewMemo}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              新規メモ
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">メモ一覧</h2>
            <MemoList
              memos={memos}
              onSelectMemo={handleSelectMemo}
              onDeleteMemo={handleDeleteMemo}
              selectedMemoId={selectedMemo?.id}
            />
          </div>

          <div>
            {isEditing ? (
              <>
                <h2 className="text-lg font-semibold mb-4">
                  {selectedMemo ? "メモを編集" : "新規メモ"}
                </h2>
                <div className="bg-white p-6 rounded-lg shadow">
                  <MemoForm
                    memo={selectedMemo}
                    onSave={handleSaveMemo}
                    onCancel={handleCancel}
                  />
                </div>
              </>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-500 text-center">
                  メモを選択するか、新規メモを作成してください
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
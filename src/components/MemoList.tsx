"use client";

import { Memo } from "@/types/memo";

interface MemoListProps {
  memos: Memo[];
  onSelectMemo: (memo: Memo) => void;
  onDeleteMemo: (id: string) => void;
  selectedMemoId?: string;
}

export default function MemoList({ memos, onSelectMemo, onDeleteMemo, selectedMemoId }: MemoListProps) {
  return (
    <div className="space-y-2">
      {memos.length === 0 ? (
        <p className="text-gray-500 text-center py-8">メモがありません</p>
      ) : (
        memos.map((memo) => (
          <div
            key={memo.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedMemoId === memo.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => onSelectMemo(memo)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{memo.title || "無題のメモ"}</h3>
                <p className="text-gray-600 line-clamp-2">{memo.content}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(memo.updatedAt).toLocaleString("ja-JP")}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteMemo(memo.id);
                }}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                削除
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
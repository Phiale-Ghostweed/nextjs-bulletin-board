'use client';

import React, { useState } from 'react';

interface Post {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      name: '管理者',
      message: '掲示板アプリへようこそ！自由に書き込んでください！',
      createdAt: '2026/07/08 18:00',
    },
  ]);

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(!name.trim() || !message.trim()) return;

    const newPost = {
      id: Date.now(),
      name: name,
      message: message,
      createdAt: new Date().toLocaleString('ja-JP'),
    };

    setPosts([newPost, ...posts]);

    setName('');
    setMessage('');
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <main className='min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8'>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          掲示板
        </h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">お名前</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="匿名希望"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メッセージ
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="メッセージを入力してください"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            投稿する
          </button>
        </form>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">投稿一覧 ({posts.length}件)</h2>
          {posts.length === 0 ? (
            <p className="text-gray-500 text-center py-4">まだ投稿はありません。</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold text-gray-900 truncate">{post.name}</span>
                    <span className="text-xs text-gray-400">{post.createdAt}</span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap break-words">{post.message}</p>
                </div>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-sm text-red-500 hover:text-red-700 ml-4 font-medium"
                >
                  削除
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </main>

  );
}
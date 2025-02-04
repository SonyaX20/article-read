import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Article {
  id: string;
  title: string;
  content: string;
  date: string;
  folder: string;
}

interface Folder {
  id: string;
  name: string;
  articles: Article[];
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  // 生成示例数据
  useEffect(() => {
    const generateArticle = (folderId: string): Article => ({
      id: Math.random().toString(36).substr(2, 9),
      title: `${Lorem.generateWords(3)}`,
      content: `${Lorem.generateParagraphs(5)}`,
      date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
      folder: folderId
    });

    const sampleFolders: Folder[] = [
      {
        id: '1',
        name: '技术文章',
        articles: Array(5).fill(null).map(() => generateArticle('1'))
      },
      {
        id: '2',
        name: '读书笔记',
        articles: Array(3).fill(null).map(() => generateArticle('2'))
      },
      {
        id: '3',
        name: '个人日记',
        articles: Array(4).fill(null).map(() => generateArticle('3'))
      }
    ];

    setFolders(sampleFolders);
    setExpandedFolders(['1']); // 默认展开第一个文件夹
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { username } = JSON.parse(userInfo);
      setUsername(username);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>文章阅读系统</h1>
        <button className="logout-button" onClick={handleLogout}>
          退出登录
        </button>
      </header>
      
      <main className="dashboard-content">
        {/* 左侧边栏 */}
        <div className="sidebar">
          <button className="add-folder-btn">
            <i>+</i>
            <span>新建文件夹</span>
          </button>
          <div className="folder-list">
            {folders.map(folder => (
              <div key={folder.id} className="folder-item">
                <div 
                  className="folder-header"
                  onClick={() => toggleFolder(folder.id)}
                >
                  <i>{expandedFolders.includes(folder.id) ? '▼' : '▶'}</i>
                  <span className="folder-name">{folder.name}</span>
                  <span>({folder.articles.length})</span>
                </div>
                {expandedFolders.includes(folder.id) && (
                  <div className="article-list">
                    {folder.articles.map(article => (
                      <div
                        key={article.id}
                        className={`article-item ${selectedArticle?.id === article.id ? 'active' : ''}`}
                        onClick={() => handleArticleClick(article)}
                      >
                        {article.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 右侧文章内容 */}
        <div className="article-content">
          {selectedArticle ? (
            <>
              <h1>{selectedArticle.title}</h1>
              <div className="article-meta">
                发布于 {selectedArticle.date}
              </div>
              <div className="article-body">
                {selectedArticle.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </>
          ) : (
            <div className="welcome-message">
              <h2>欢迎回来, {username}!</h2>
              <p>请从左侧选择一篇文章开始阅读</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// 简单的 Lorem Ipsum 生成器
const Lorem = {
  words: ['技术', '开发', '学习', '笔记', '总结', '心得', '分享', '教程', '实践', '探索', '研究', '方案', '架构', '设计', '原理', '创新', '思考', '观点', '讨论', '分析'],
  
  generateWords(count: number): string {
    return Array(count)
      .fill(null)
      .map(() => this.words[Math.floor(Math.random() * this.words.length)])
      .join(' ');
  },

  generateParagraphs(count: number): string {
    return Array(count)
      .fill(null)
      .map(() => {
        const sentenceCount = Math.floor(Math.random() * 3) + 2;
        return Array(sentenceCount)
          .fill(null)
          .map(() => this.generateWords(Math.floor(Math.random() * 10) + 5))
          .join('。 ') + '。';
      })
      .join('\n\n');
  }
};

export default Dashboard; 
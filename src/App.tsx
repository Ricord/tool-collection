import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ViewColumnsIcon, CubeIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import './App.css';

interface Tool {
  id: string;
  name: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  tools: Tool[];
}

interface Section {
  id: string;
  name: string;
  categories: Category[];
}

const App: React.FC = () => {
  const [sections] = useState<Section[]>([
    {
      id: 'section1',
      name: '文档处理',
      categories: [
        {
          id: 'cat1',
          name: '文本编辑',
          tools: [
            { id: 'tool1', name: '富文本编辑器', description: '功能强大的文本编辑工具' },
            { id: 'tool2', name: 'Markdown编辑器', description: '轻量级Markdown编辑工具' },
          ],
        },
        {
          id: 'cat2',
          name: 'PDF处理',
          tools: [
            { id: 'tool3', name: 'PDF阅读器', description: '查看和注释PDF文件' },
            { id: 'tool4', name: 'PDF转换器', description: '转换PDF到其他格式' },
          ],
        },
      ],
    },
    {
      id: 'section2',
      name: '解析工具',
      categories: [
        {
          id: 'cat3',
          name: '数据解析',
          tools: [
            { id: 'tool5', name: 'JSON解析器', description: '解析和格式化JSON数据' },
            { id: 'tool6', name: 'XML解析器', description: '解析和验证XML文档' },
          ],
        },
        {
          id: 'cat4',
          name: '文本解析',
          tools: [
            { id: 'tool7', name: '正则表达式测试器', description: '测试和调试正则表达式' },
            { id: 'tool8', name: '文本分析器', description: '分析文本的结构和内容' },
          ],
        },
      ],
    },
    // ... 可以添加更多sections
  ]);
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [activeCategory, setActiveCategory] = useState(sections[0].categories[0].id);
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); // 默认展开

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    // 确保在切换部分时导航栏保持展开状态
    setIsSidebarExpanded(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 左侧导航栏 */}
      <nav className={`${isSidebarExpanded ? 'w-64' : 'w-20'} flex-shrink-0 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white overflow-hidden transition-all duration-300`}>
        <div className="p-4 h-full flex flex-col">
          <div className={`flex items-center ${isSidebarExpanded ? 'justify-between' : 'justify-center'} mb-8`}>
            {isSidebarExpanded ? (
              <h1 className="text-2xl font-bold flex items-center">
                <CubeIcon className="w-8 h-8 mr-2 flex-shrink-0" />
                <span className="truncate">工作集合</span>
              </h1>
            ) : (
              <CubeIcon className="w-8 h-8" />
            )}
          </div>
          {isSidebarExpanded && (
            <Menu as="div" className="relative flex-grow">
              {({ open }) => (
                <>
                  <Menu.Button 
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-white bg-indigo-700 rounded-lg hover:bg-indigo-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
                  >
                    <span className="flex items-center truncate">
                      <ViewColumnsIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span className="truncate">{sections.find((s) => s.id === activeSection)?.name}</span>
                    </span>
                    <ChevronDownIcon 
                      className={`w-5 h-5 ml-2 flex-shrink-0 transition-transform duration-200 ${open ? 'transform rotate-180' : ''}`} 
                      aria-hidden="true" 
                    />
                  </Menu.Button>
                  <Transition
                    show={open}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items static className="absolute w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {sections.map((section) => (
                        <Menu.Item key={section.id}>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                              } group flex rounded-md items-center w-full px-3 py-3 text-sm transition-colors duration-200`}
                              onClick={() => handleSectionChange(section.id)}
                            >
                              <span className="truncate">{section.name}</span>
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          )}
          <button
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className="mt-auto p-2 rounded-md hover:bg-indigo-500 transition-colors duration-200 self-center"
          >
            {isSidebarExpanded ? (
              <ChevronLeftIcon className="w-6 h-6" />
            ) : (
              <ChevronRightIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* 中间分类栏 */}
      <div className="w-64 flex-shrink-0 bg-white border-r border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 h-full flex flex-col">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 truncate">
            {sections.find((s) => s.id === activeSection)?.name}
          </h2>
          <ul className="space-y-2 overflow-y-auto flex-grow">
            {sections
              .find((s) => s.id === activeSection)
              ?.categories.map((category) => (
                <li key={category.id}>
                  <button
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeCategory === category.id
                        ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span className="truncate block">{category.name}</span>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* 右侧主界面 */}
      <main className="flex-grow p-8 overflow-auto">
        {activeTool ? (
          <div className="bg-white shadow-xl rounded-2xl p-8 transition-all duration-300 transform hover:scale-[1.02]">
            <h2 className="text-3xl font-bold mb-4 text-indigo-700">{activeTool.name}</h2>
            <p className="mb-8 text-gray-600 text-lg">{activeTool.description}</p>
            <button
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
              onClick={() => setActiveTool(null)}
            >
              返回工具列表
            </button>
            {/* 这里可以添加工具的具体实现 */}
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              {sections.find((s) => s.id === activeSection)?.categories.find((c) => c.id === activeCategory)?.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sections
                .find((s) => s.id === activeSection)
                ?.categories.find((c) => c.id === activeCategory)
                ?.tools.map((tool) => (
                  <div key={tool.id} className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03]">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-3">{tool.name}</h3>
                    <p className="text-gray-600 mb-6">{tool.description}</p>
                    <button
                      className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
                      onClick={() => setActiveTool(tool)}
                    >
                      打开工具
                    </button>
                  </div>
                ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;

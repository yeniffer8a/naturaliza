import { useState } from "react";

interface Tab {
  label: string;
  value: string;
}

interface ProductTabsProps {
  tabs: Tab[];
}

export function ProductTabs({ tabs }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.label
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600 hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs.find((tab) => tab.label === activeTab)?.value}
      </div>
    </div>
  );
}

import React from 'react'

function Tabs({activeTab,handleTabChange}) {
  return (
    <div>
      <div className="tab-container">
        <button 
          className={`tab-button ${activeTab === 'prep' ? 'active' : ''}`}
          onClick={() => handleTabChange('prep')}
        >
          PREPで作成
        </button>
        <button 
          className={`tab-button ${activeTab === 'free' ? 'active' : ''}`}
          onClick={() => handleTabChange('free')}
        >
          自由に作成
        </button>
      </div>
    </div>
  )
}

export default Tabs
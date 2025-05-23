import { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext.jsx';

function Dashboard() {
  const { connected, walletAddress, balance } = useWallet();
  const [activeFlows, setActiveFlows] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalValue: 0,
    activeFlowCount: 0
  });

  // Fetch dashboard data
  useEffect(() => {
    if (connected) {
      // Mock data - in a real app this would come from your backend or blockchain
      setActiveFlows([
        { id: 1, name: 'Team Payment Split', type: 'split', recipients: 3, value: 250, nextExecution: '2025-07-15' },
        { id: 2, name: 'Subscription Stream', type: 'stream', recipients: 1, value: 10, nextExecution: '2025-06-30' }
      ]);
      
      setRecentTransactions([
        { id: 'tx1', type: 'sent', amount: 150, recipient: '0x1ab...3cd', timestamp: '2025-06-20T10:30:00', status: 'completed' },
        { id: 'tx2', type: 'received', amount: 75, sender: '0x4ef...8ab', timestamp: '2025-06-19T14:45:00', status: 'completed' },
        { id: 'tx3', type: 'sent', amount: 25, recipient: '0x7cd...9ef', timestamp: '2025-06-18T09:15:00', status: 'completed' }
      ]);
      
      setStats({
        totalTransactions: 24,
        totalValue: 1250,
        activeFlowCount: 2
      });
    }
  }, [connected]);

  return (
    <div className="dashboard">
      <section className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="wallet-summary">
          <div className="balance-card">
            <h3>Balance</h3>
            <div className="balance-amount">{balance} SUI</div>
          </div>
          <div className="stats-cards">
            <div className="stat-card">
              <h3>Active Flows</h3>
              <div className="stat-value">{stats.activeFlowCount}</div>
            </div>
            <div className="stat-card">
              <h3>Total Transactions</h3>
              <div className="stat-value">{stats.totalTransactions}</div>
            </div>
            <div className="stat-card">
              <h3>Total Value</h3>
              <div className="stat-value">{stats.totalValue} SUI</div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="active-flows">
        <div className="section-header">
          <h2>Active Payment Flows</h2>
          <button className="create-flow-button">Create New Flow</button>
        </div>
        
        {activeFlows.length > 0 ? (
          <div className="flows-grid">
            {activeFlows.map(flow => (
              <div key={flow.id} className={`flow-card ${flow.type}`}>
                <div className="flow-header">
                  <h3>{flow.name}</h3>
                  <span className="flow-type">{flow.type}</span>
                </div>
                <div className="flow-details">
                  <div className="flow-info">
                    <span>Recipients: {flow.recipients}</span>
                    <span>Value: {flow.value} SUI</span>
                  </div>
                  <div className="flow-schedule">
                    <span>Next: {new Date(flow.nextExecution).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flow-actions">
                  <button className="edit-flow">Edit</button>
                  <button className="pause-flow">Pause</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-flows">
            <p>You don't have any active payment flows yet.</p>
            <button className="create-flow-button">Create Your First Flow</button>
          </div>
        )}
      </section>
      
      <section className="recent-transactions">
        <h2>Recent Transactions</h2>
        
        {recentTransactions.length > 0 ? (
          <div className="transactions-table">
            <div className="table-header">
              <div className="col">Type</div>
              <div className="col">Amount</div>
              <div className="col">To/From</div>
              <div className="col">Date</div>
              <div className="col">Status</div>
            </div>
            
            {recentTransactions.map(tx => (
              <div key={tx.id} className="table-row">
                <div className={`col tx-type ${tx.type}`}>
                  {tx.type === 'sent' ? 'Sent' : 'Received'}
                </div>
                <div className="col tx-amount">
                  {tx.amount} SUI
                </div>
                <div className="col tx-address">
                  {tx.type === 'sent' ? tx.recipient : tx.sender}
                </div>
                <div className="col tx-date">
                  {new Date(tx.timestamp).toLocaleString()}
                </div>
                <div className="col tx-status">
                  <span className={`status ${tx.status}`}>{tx.status}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-transactions">
            <p>No transactions yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
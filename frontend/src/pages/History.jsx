import { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext.jsx';

function History() {
  const { connected, walletAddress } = useWallet();
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: 'all',
    status: 'all'
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch transaction history
  useEffect(() => {
    if (connected) {
      setIsLoading(true);
      
      // Mock transaction data - in a real app, this would come from your backend or blockchain
      setTimeout(() => {
        const mockTransactions = [
          { 
            id: 'tx1', 
            type: 'payment',
            subType: 'sent',
            amount: 150, 
            recipient: '0x1ab...3cd', 
            timestamp: '2025-06-20T10:30:00', 
            status: 'completed',
            flowId: 'flow-123',
            flowName: 'Team Payment Split'
          },
          { 
            id: 'tx2', 
            type: 'payment',
            subType: 'received',
            amount: 75, 
            sender: '0x4ef...8ab', 
            timestamp: '2025-06-19T14:45:00', 
            status: 'completed',
            flowId: null,
            flowName: null
          },
          { 
            id: 'tx3', 
            type: 'payment',
            subType: 'sent',
            amount: 25, 
            recipient: '0x7cd...9ef', 
            timestamp: '2025-06-18T09:15:00', 
            status: 'completed',
            flowId: 'flow-456',
            flowName: 'Monthly Subscription'
          },
          { 
            id: 'tx4', 
            type: 'flow',
            subType: 'created',
            flowId: 'flow-123',
            flowName: 'Team Payment Split',
            timestamp: '2025-06-15T16:20:00', 
            status: 'completed'
          },
          { 
            id: 'tx5', 
            type: 'payment',
            subType: 'sent',
            amount: 50, 
            recipient: '0x2de...4ab', 
            timestamp: '2025-06-10T11:05:00', 
            status: 'failed',
            flowId: null,
            flowName: null
          },
          { 
            id: 'tx6', 
            type: 'flow',
            subType: 'modified',
            flowId: 'flow-456',
            flowName: 'Monthly Subscription',
            timestamp: '2025-06-05T13:40:00', 
            status: 'completed'
          },
          { 
            id: 'tx7', 
            type: 'payment',
            subType: 'scheduled',
            amount: 100, 
            recipient: '0x5fg...7hi', 
            timestamp: '2025-07-01T00:00:00', 
            status: 'pending',
            flowId: 'flow-456',
            flowName: 'Monthly Subscription'
          }
        ];
        
        setTransactions(mockTransactions);
        setIsLoading(false);
      }, 1000);
    }
  }, [connected]);

  // Apply filters to transactions
  const filteredTransactions = transactions.filter(tx => {
    // Filter by type
    if (filters.type !== 'all' && tx.type !== filters.type) {
      return false;
    }
    
    // Filter by status
    if (filters.status !== 'all' && tx.status !== filters.status) {
      return false;
    }
    
    // Filter by date range
    if (filters.dateRange !== 'all') {
      const txDate = new Date(tx.timestamp);
      const today = new Date();
      const daysDiff = Math.floor((today - txDate) / (1000 * 60 * 60 * 24));
      
      if (filters.dateRange === 'week' && daysDiff > 7) {
        return false;
      } else if (filters.dateRange === 'month' && daysDiff > 30) {
        return false;
      }
    }
    
    return true;
  });

  // Update filters
  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };

  return (
    <div className="history-page">
      <div className="history-header">
        <h1>Transaction History</h1>
        
        <div className="filters">
          <div className="filter-group">
            <label>Type</label>
            <select 
              value={filters.type} 
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="payment">Payments</option>
              <option value="flow">Flow Changes</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Date Range</label>
            <select 
              value={filters.dateRange} 
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Status</label>
            <select 
              value={filters.status} 
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading transaction history...</p>
        </div>
      ) : filteredTransactions.length > 0 ? (
        <div className="transactions-table">
          <div className="table-header">
            <div className="col date-col">Date & Time</div>
            <div className="col type-col">Type</div>
            <div className="col details-col">Details</div>
            <div className="col amount-col">Amount</div>
            <div className="col status-col">Status</div>
            <div className="col actions-col">Actions</div>
          </div>
          
          {filteredTransactions.map(tx => (
            <div key={tx.id} className={`table-row ${tx.status}`}>
              <div className="col date-col">
                {new Date(tx.timestamp).toLocaleString()}
              </div>
              
              <div className="col type-col">
                <span className={`tx-type ${tx.type} ${tx.subType}`}>
                  {tx.type === 'payment' ? (
                    tx.subType === 'sent' ? 'Sent' : 
                    tx.subType === 'received' ? 'Received' : 
                    tx.subType === 'scheduled' ? 'Scheduled' : 'Payment'
                  ) : (
                    tx.subType === 'created' ? 'Flow Created' :
                    tx.subType === 'modified' ? 'Flow Modified' : 'Flow Change'
                  )}
                </span>
              </div>
              
              <div className="col details-col">
                {tx.type === 'payment' ? (
                  <div className="payment-details">
                    {tx.subType === 'sent' && (
                      <span>To: {tx.recipient}</span>
                    )}
                    {tx.subType === 'received' && (
                      <span>From: {tx.sender}</span>
                    )}
                    {tx.flowName && (
                      <span className="flow-tag">Flow: {tx.flowName}</span>
                    )}
                  </div>
                ) : (
                  <div className="flow-details">
                    <span>{tx.flowName}</span>
                  </div>
                )}
              </div>
              
              <div className="col amount-col">
                {tx.amount ? `${tx.amount} SUI` : '-'}
              </div>
              
              <div className="col status-col">
                <span className={`status-badge ${tx.status}`}>
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </span>
              </div>
              
              <div className="col actions-col">
                <button className="view-details-button">View</button>
                {tx.status === 'failed' && (
                  <button className="retry-button">Retry</button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-transactions">
          <p>No transactions found matching your filters.</p>
          <button 
            className="reset-filters-button"
            onClick={() => setFilters({ type: 'all', dateRange: 'all', status: 'all' })}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default History;
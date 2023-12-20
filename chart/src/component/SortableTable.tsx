import React, { useState, ChangeEvent, useEffect } from 'react';
import data from '../data/allData.json';

type ContractData = {
  owner_count: number;
  threshold_percentage: number;
  token_count: number;
  threshold: string;
  balance: number;
  firstActivityTime: string;
  lastActivityTime: string;
  effective_period: string;
  proposal_counter: string;
  tzsafe_version: string;
};

const sortData = (sortOption: string, data: ContractData[]) => {
  const [field, direction] = sortOption.split('%') as [keyof ContractData, 'asc' | 'desc'];
  const newData = [...data];
  newData.sort((a, b) => {
    if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
    if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
    return 0;
  });
  return newData;
};

const SortableTable: React.FC = () => {
  const [sortField, setSortField] = useState<string>('owner_count%desc');
  const [sortedData, setSortedData] = useState<ContractData[]>(sortData(sortField, data));

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortField(event.target.value);
    setSortedData(sortData(event.target.value, sortedData));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-2">
        <select
          value={sortField}
          onChange={handleSelectChange}
          className="p-2 border border-gray-300 rounded"
        >
          {/* List all sortable fields */}
          <option value="owner_count%asc">Owner Count - Asc</option>
          <option value="owner_count%desc">Owner Count - Desc</option>
          <option value="threshold_percentage%asc">Threshold Percentage - Asc</option>
          <option value="threshold_percentage%desc">Threshold Percentage - Desc</option>
          <option value="token_count%asc">Token Count - Asc</option>
          <option value="token_count%desc">Token Count - Desc</option>
          <option value="threshold%asc">Threshold - Asc</option>
          <option value="threshold%desc">Threshold - Desc</option>
          <option value="balance%asc">Balance - Asc</option>
          <option value="balance%desc">Balance - Desc</option>
          <option value="firstActivityTime%asc">First Activity Time - Asc</option>
          <option value="firstActivityTime%desc">First Activity Time - Desc</option>
          <option value="lastActivityTime%asc">Last Activity Time - Asc</option>
          <option value="lastActivityTime%desc">Last Activity Time - Desc</option>
          <option value="effective_period%asc">Effective Period - Asc</option>
          <option value="effective_period%desc">Effective Period - Desc</option>
          <option value="proposal_counter%asc">Proposal Counter - Asc</option>
          <option value="proposal_counter%desc">Proposal Counter - Desc</option>
          <option value="tzsafe_version%asc">TZSafe Version - Asc</option>
          <option value="tzsafe_version%desc">TZSafe Version - Desc</option>
        </select>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {/* Table headers */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Count</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Threshold Percentage</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token Count</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Threshold</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Activity Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effective Period</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposal Counter</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TZSafe Version</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{item.owner_count}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.threshold_percentage}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.token_count}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.threshold}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.balance}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.firstActivityTime}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.lastActivityTime}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.effective_period}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.proposal_counter}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.tzsafe_version}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTable;

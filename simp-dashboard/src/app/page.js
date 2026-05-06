"use client";
import { useState } from 'react';
import Dropdown from '@/components/Input/Dropdown';

export default function Home() {
  const [selectedNodes, setSelectedNodes] = useState([]);
  
  return (
    <div className="p-8">
      <div>I'm on top</div>
      <div className="mt-8 flex flex-col gap-4">
        <Dropdown 
          lists={["Node A", "Node B", "Node C", "Gateway 1"]}
          value={selectedNodes}
          onChange={setSelectedNodes}
          placeholder="Select Node" 
          className='w-64' 
        />
      </div>
    </div>
  );
}

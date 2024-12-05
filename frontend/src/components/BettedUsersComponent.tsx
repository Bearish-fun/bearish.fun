interface BettedUsersComponentProps {
  betType: 'up' | 'down';
  pool: number;
  potential: number;
  investors: string[];
}

const BettedUsersComponent = ({betType, pool, potential, investors}: BettedUsersComponentProps) => {
  const groupedInvestors = investors.reduce((acc, _, index) => {
    const chunkIndex = Math.floor(index / 10);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(_);
    return acc;
  }, [] as string[][]);

  return (
    <div className={`w-full flex flex-col gap-4 p-2 rounded-lg ${betType === 'up' ? 'bg-positive-dark bg-opacity-5' : 'bg-negative-dark bg-opacity-5'}`}>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-sm leading-[1.6]">
          <p className="text-gray-secondary">Pool</p>
          <p className="text-gray-primary">${pool}</p>
        </div>
        <div className="flex justify-between text-sm leading-[1.6]">
          <p className="text-gray-secondary">Potential</p>
          <p className="text-gray-primary">{potential}%</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        {groupedInvestors.map((group, index) => (
          <div key={index} className="w-full flex">
            {group.map((investor, index) => (
              <img
                key={index}
                src={investor}
                alt={`Investor ${index + 1}`}
                className={`w-10 h-10 rounded-full ${index === 0 ? 'ml-0' : group.length > 6 ? `ml-[calc((100%-400px)/9)]` : group.length > 4 ? `ml-[calc((100%-240px)/5)]` : 'ml-1.5'}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BettedUsersComponent
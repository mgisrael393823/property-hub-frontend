import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface TableRowSkeletonProps {
  columns?: number;
  cellWidths?: string[];
}

/**
 * Skeleton loader for table rows
 */
export function TableRowSkeleton({
  columns = 4,
  cellWidths = ['25%', '25%', '20%', '30%']
}: TableRowSkeletonProps) {
  // Ensure cellWidths matches the number of columns
  const widths = [...cellWidths];
  while (widths.length < columns) {
    widths.push('auto');
  }

  return (
    <TableRow>
      {[...Array(columns)].map((_, index) => (
        <TableCell key={index}>
          <Skeleton 
            className="h-5" 
            style={{ width: widths[index] }}
          />
        </TableCell>
      ))}
    </TableRow>
  );
}

export default TableRowSkeleton;
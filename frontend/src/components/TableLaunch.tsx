import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Launch } from "@/interfaces/Launch";

interface TableLaunchProps {
  data?: Launch[];
}

export function TableLaunch({ data }: TableLaunchProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">ID</TableHead>
          <TableHead className="w-[200px]">Descricao</TableHead>
          <TableHead className="w-[200px]">Valor</TableHead>
          <TableHead className="w-[200px]">Tipo</TableHead>
        </TableRow>
      </TableHeader>
      {data && data.length > 0 ? (
        <TableBody>
            {data.map((launch, index) => (
              <TableRow key={index}>
                <TableCell>{launch.id}</TableCell>
                <TableCell>{launch.description}</TableCell>
                <TableCell>{launch.value}</TableCell>
                <TableCell>
                  {new Date(launch.date).toLocaleDateString("pt-Br")}
                </TableCell>
                <TableCell>{launch.type}</TableCell>
              </TableRow>
            ))}
      </TableBody>
      ) : (
          <TableBody>

              <TableRow>
                <TableCell className="text-center" colSpan={5}>SEM DADOS</TableCell>
              </TableRow>

      </TableBody>
      )}
    </Table>
  );
}

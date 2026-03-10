import type React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getAllProperties } from '@/lib/storage';
import { formatPrice, formatArea } from '@/lib/utils';
import type { Property } from '@/types/property';

interface ComparePageProps {
  compareIds: string[];
  onToggleCompare: (id: string) => void;
}

export function ComparePage({
  compareIds,
  onToggleCompare,
}: ComparePageProps): React.ReactElement {
  const allProperties = getAllProperties();

  const selectedProperties = allProperties.filter((property) =>
    compareIds.includes(property.id)
  );

  const getPricePerSqm = (property: Property): number => {
    return property.price / property.area;
  };

  if (selectedProperties.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Comparar propiedades</h1>
        <p className="text-muted-foreground mb-6">
          No hay propiedades seleccionadas para comparar.
        </p>
        <Button asChild>
          <Link to="/">Volver al inicio</Link>
        </Button>
      </div>
    );
  }

  const lowestPrice = Math.min(...selectedProperties.map((property) => property.price));
  const highestArea = Math.max(...selectedProperties.map((property) => property.area));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Comparar propiedades</h1>
          <p className="text-muted-foreground">
            {selectedProperties.length}{' '}
            {selectedProperties.length === 1
              ? 'propiedad seleccionada'
              : 'propiedades seleccionadas'}
          </p>
        </div>

        <Button asChild variant="outline">
          <Link to="/">Volver al listado</Link>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-muted">
              <th className="text-left p-4 border">Métrica</th>
              {selectedProperties.map((property) => (
                <th
                  key={property.id}
                  className="text-left p-4 border min-w-[220px] align-top"
                >
                  <div className="space-y-2">
                    <p className="font-semibold">{property.title}</p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onToggleCompare(property.id)}
                    >
                      Quitar
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="p-4 border font-medium">Precio</td>
              {selectedProperties.map((property) => (
                <td
                  key={property.id}
                  className={`p-4 border ${property.price === lowestPrice ? 'bg-green-100' : ''}`}
                >
                  {formatPrice(property.price)}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 border font-medium">Habitaciones</td>
              {selectedProperties.map((property) => (
                <td key={property.id} className="p-4 border">
                  {property.bedrooms}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 border font-medium">Baños</td>
              {selectedProperties.map((property) => (
                <td key={property.id} className="p-4 border">
                  {property.bathrooms}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 border font-medium">Área</td>
              {selectedProperties.map((property) => (
                <td
                  key={property.id}
                  className={`p-4 border ${property.area === highestArea ? 'bg-green-100' : ''}`}
                >
                  {formatArea(property.area)}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 border font-medium">Precio por m²</td>
              {selectedProperties.map((property) => (
                <td key={property.id} className="p-4 border">
                  {formatPrice(getPricePerSqm(property))}/m²
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
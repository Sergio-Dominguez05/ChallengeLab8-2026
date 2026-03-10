// =============================================================================
// COMPONENTE: PROPERTY CARD
// =============================================================================
// Tarjeta individual para mostrar información resumida de una propiedad.
//
// ## Props como contrato de componente
// Este componente recibe todos sus datos vía props:
// - property: objeto completo de la propiedad
// - onDelete: callback para eliminar
//
// Esto sigue el patrón "props down, events up":
// - Los datos bajan desde el padre
// - Los eventos suben al padre mediante callbacks
// =============================================================================

import type React from 'react';
import { Link } from 'react-router-dom';
import { BedDouble, Bath, Square, MapPin, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CompareButton } from '@/components/CompareButton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { Property } from '@/types/property';
import {
  PROPERTY_TYPE_LABELS,
  OPERATION_TYPE_LABELS,
} from '@/types/property';
import { formatPrice, formatArea, getPropertyTypeColor } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  onDelete: (id: string) => void;
  isSelectedForCompare: boolean;
  onToggleCompare: (id: string) => void;
}

/**
 * Tarjeta visual de una propiedad.
 */
export function PropertyCard({
  property,
  onDelete,
  isSelectedForCompare,
  onToggleCompare,
}: PropertyCardProps): React.ReactElement {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover"
        />

        {/* Badges superpuestos */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={getPropertyTypeColor(property.propertyType)}>
            {PROPERTY_TYPE_LABELS[property.propertyType]}
          </Badge>
          <Badge variant="secondary">
            {OPERATION_TYPE_LABELS[property.operationType]}
          </Badge>
        </div>
      </div>

      {/* Contenido */}
      <CardHeader>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold line-clamp-1">{property.title}</h3>

          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 mr-1 shrink-0" />
            <span className="line-clamp-1">
              {property.address}, {property.city}
            </span>
          </div>

          <p className="text-2xl font-bold text-primary">
            {formatPrice(property.price)}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        {/* Características */}
        <div className="grid grid-cols-3 gap-4 py-4 border-y">
          <div className="text-center">
            <BedDouble className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-sm font-medium">{property.bedrooms}</p>
            <p className="text-xs text-muted-foreground">
              {property.bedrooms === 1 ? 'Habitación' : 'Habitaciones'}
            </p>
          </div>

          <div className="text-center">
            <Bath className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-sm font-medium">{property.bathrooms}</p>
            <p className="text-xs text-muted-foreground">
              {property.bathrooms === 1 ? 'Baño' : 'Baños'}
            </p>
          </div>

          <div className="text-center">
            <Square className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-sm font-medium">{formatArea(property.area)}</p>
            <p className="text-xs text-muted-foreground">Área</p>
          </div>
        </div>

        {/* Descripción */}
        <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
          {property.description}
        </p>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2">
        <CompareButton
          isSelected={isSelectedForCompare}
          onClick={() => onToggleCompare(property.id)}
        />

        <Button asChild variant="outline" className="flex-1">
          <Link to={`/property/${property.id}`}>
            Ver detalles
          </Link>
        </Button>

        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(property.id)}
          aria-label="Eliminar propiedad"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
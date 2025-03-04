export interface Checklist {
    checklist_id: number;    // ID autoincremental
    aircraft_id: number;     // ID del avión (clave foránea)
    item_order: number;      // Orden del ítem en la sección (puedes usar un tipo numérico con decimales)
    description: string;     // Descripción de la sección
    is_section: boolean;     // Indica si es una sección principal o no
  }
  
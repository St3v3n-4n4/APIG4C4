import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Aeropuerto} from './aeropuerto.model';
import {Vuelo} from './vuelo.model';

@model()
export class Ruta extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  origen: string;

  @property({
    type: 'string',
    required: true,
  })
  destino: string;

  @property({
    type: 'number',
    required: true,
  })
  tiempo_estimado: number;

  @belongsTo(() => Aeropuerto)
  origenId: string;

  @belongsTo(() => Aeropuerto)
  destinoId: string;

  @hasMany(() => Vuelo)
  vuelos: Vuelo[];

  constructor(data?: Partial<Ruta>) {
    super(data);
  }
}

export interface RutaRelations {
  // describe navigational properties here
}

export type RutaWithRelations = Ruta & RutaRelations;

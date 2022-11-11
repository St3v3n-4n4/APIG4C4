import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
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

import {Entity, model, property, hasMany} from '@loopback/repository';
import {Ruta} from './ruta.model';

@model()
export class Aeropuerto extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  pais: string;

  @property({
    type: 'string',
    required: true,
  })
  coordenada_X: string;

  @property({
    type: 'string',
    required: true,
  })
  coordenada_Y: string;

  @property({
    type: 'string',
    required: true,
  })
  sigla: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @hasMany(() => Ruta, {keyTo: 'origenId'})
  rutasOrigen: Ruta[];

  @hasMany(() => Ruta, {keyTo: 'destinoId'})
  rutasDestino: Ruta[];

  constructor(data?: Partial<Aeropuerto>) {
    super(data);
  }
}

export interface AeropuertoRelations {
  // describe navigational properties here
}

export type AeropuertoWithRelations = Aeropuerto & AeropuertoRelations;

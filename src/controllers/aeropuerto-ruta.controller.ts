import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Aeropuerto,
  Ruta,
} from '../models';
import {AeropuertoRepository} from '../repositories';

export class AeropuertoRutaController {
  constructor(
    @repository(AeropuertoRepository) protected aeropuertoRepository: AeropuertoRepository,
  ) { }

  @get('/aeropuertos/{id}/rutas', {
    responses: {
      '200': {
        description: 'Array of Aeropuerto has many Ruta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ruta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ruta>,
  ): Promise<Ruta[]> {
    return this.aeropuertoRepository.rutasOrigen(id).find(filter);
  }

  @post('/aeropuertos/{id}/rutas', {
    responses: {
      '200': {
        description: 'Aeropuerto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ruta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Aeropuerto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ruta, {
            title: 'NewRutaInAeropuerto',
            exclude: ['id'],
            optional: ['origenId']
          }),
        },
      },
    }) ruta: Omit<Ruta, 'id'>,
  ): Promise<Ruta> {
    return this.aeropuertoRepository.rutasOrigen(id).create(ruta);
  }

  @patch('/aeropuertos/{id}/rutas', {
    responses: {
      '200': {
        description: 'Aeropuerto.Ruta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ruta, {partial: true}),
        },
      },
    })
    ruta: Partial<Ruta>,
    @param.query.object('where', getWhereSchemaFor(Ruta)) where?: Where<Ruta>,
  ): Promise<Count> {
    return this.aeropuertoRepository.rutasOrigen(id).patch(ruta, where);
  }

  @del('/aeropuertos/{id}/rutas', {
    responses: {
      '200': {
        description: 'Aeropuerto.Ruta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ruta)) where?: Where<Ruta>,
  ): Promise<Count> {
    return this.aeropuertoRepository.rutasOrigen(id).delete(where);
  }
}

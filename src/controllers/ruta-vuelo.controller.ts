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
  Ruta,
  Vuelo,
} from '../models';
import {RutaRepository} from '../repositories';

export class RutaVueloController {
  constructor(
    @repository(RutaRepository) protected rutaRepository: RutaRepository,
  ) { }

  @get('/rutas/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Array of Ruta has many Vuelo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vuelo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vuelo>,
  ): Promise<Vuelo[]> {
    return this.rutaRepository.vuelos(id).find(filter);
  }

  @post('/rutas/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Ruta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vuelo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ruta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vuelo, {
            title: 'NewVueloInRuta',
            exclude: ['id'],
            optional: ['rutaId']
          }),
        },
      },
    }) vuelo: Omit<Vuelo, 'id'>,
  ): Promise<Vuelo> {
    return this.rutaRepository.vuelos(id).create(vuelo);
  }

  @patch('/rutas/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Ruta.Vuelo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vuelo, {partial: true}),
        },
      },
    })
    vuelo: Partial<Vuelo>,
    @param.query.object('where', getWhereSchemaFor(Vuelo)) where?: Where<Vuelo>,
  ): Promise<Count> {
    return this.rutaRepository.vuelos(id).patch(vuelo, where);
  }

  @del('/rutas/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Ruta.Vuelo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vuelo)) where?: Where<Vuelo>,
  ): Promise<Count> {
    return this.rutaRepository.vuelos(id).delete(where);
  }
}

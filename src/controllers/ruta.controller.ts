import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Ruta} from '../models';
import {RutaRepository} from '../repositories';

export class RutaController {
  constructor(
    @repository(RutaRepository)
    public rutaRepository : RutaRepository,
  ) {}

  @post('/rutas')
  @response(200, {
    description: 'Ruta model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ruta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ruta, {
            title: 'NewRuta',
            exclude: ['id'],
          }),
        },
      },
    })
    ruta: Omit<Ruta, 'id'>,
  ): Promise<Ruta> {
    return this.rutaRepository.create(ruta);
  }

  @get('/rutas/count')
  @response(200, {
    description: 'Ruta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Ruta) where?: Where<Ruta>,
  ): Promise<Count> {
    return this.rutaRepository.count(where);
  }

  @get('/rutas')
  @response(200, {
    description: 'Array of Ruta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ruta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Ruta) filter?: Filter<Ruta>,
  ): Promise<Ruta[]> {
    return this.rutaRepository.find(filter);
  }

  @patch('/rutas')
  @response(200, {
    description: 'Ruta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ruta, {partial: true}),
        },
      },
    })
    ruta: Ruta,
    @param.where(Ruta) where?: Where<Ruta>,
  ): Promise<Count> {
    return this.rutaRepository.updateAll(ruta, where);
  }

  @get('/rutas/{id}')
  @response(200, {
    description: 'Ruta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ruta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Ruta, {exclude: 'where'}) filter?: FilterExcludingWhere<Ruta>
  ): Promise<Ruta> {
    return this.rutaRepository.findById(id, filter);
  }

  @patch('/rutas/{id}')
  @response(204, {
    description: 'Ruta PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ruta, {partial: true}),
        },
      },
    })
    ruta: Ruta,
  ): Promise<void> {
    await this.rutaRepository.updateById(id, ruta);
  }

  @put('/rutas/{id}')
  @response(204, {
    description: 'Ruta PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ruta: Ruta,
  ): Promise<void> {
    await this.rutaRepository.replaceById(id, ruta);
  }

  @del('/rutas/{id}')
  @response(204, {
    description: 'Ruta DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.rutaRepository.deleteById(id);
  }
}

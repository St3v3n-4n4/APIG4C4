import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Aeropuerto, AeropuertoRelations, Ruta} from '../models';
import {RutaRepository} from './ruta.repository';

export class AeropuertoRepository extends DefaultCrudRepository<
  Aeropuerto,
  typeof Aeropuerto.prototype.id,
  AeropuertoRelations
> {

  public readonly rutasOrigen: HasManyRepositoryFactory<Ruta, typeof Aeropuerto.prototype.id>;

  public readonly rutasDestino: HasManyRepositoryFactory<Ruta, typeof Aeropuerto.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('RutaRepository') protected rutaRepositoryGetter: Getter<RutaRepository>,
  ) {
    super(Aeropuerto, dataSource);
    this.rutasDestino = this.createHasManyRepositoryFactoryFor('rutasDestino', rutaRepositoryGetter,);
    this.registerInclusionResolver('rutasDestino', this.rutasDestino.inclusionResolver);
    this.rutasOrigen = this.createHasManyRepositoryFactoryFor('rutasOrigen', rutaRepositoryGetter,);
    this.registerInclusionResolver('rutasOrigen', this.rutasOrigen.inclusionResolver);
  }
}

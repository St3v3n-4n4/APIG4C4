import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Ruta, RutaRelations, Aeropuerto, Vuelo} from '../models';
import {AeropuertoRepository} from './aeropuerto.repository';
import {VueloRepository} from './vuelo.repository';

export class RutaRepository extends DefaultCrudRepository<
  Ruta,
  typeof Ruta.prototype.id,
  RutaRelations
> {

  public readonly origen: BelongsToAccessor<Aeropuerto, typeof Ruta.prototype.id>;

  public readonly destino: BelongsToAccessor<Aeropuerto, typeof Ruta.prototype.id>;

  public readonly vuelos: HasManyRepositoryFactory<Vuelo, typeof Ruta.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('AeropuertoRepository') protected aeropuertoRepositoryGetter: Getter<AeropuertoRepository>, @repository.getter('VueloRepository') protected vueloRepositoryGetter: Getter<VueloRepository>,
  ) {
    super(Ruta, dataSource);
    this.vuelos = this.createHasManyRepositoryFactoryFor('vuelos', vueloRepositoryGetter,);
    this.registerInclusionResolver('vuelos', this.vuelos.inclusionResolver);
    this.destino = this.createBelongsToAccessorFor('destino', aeropuertoRepositoryGetter,);
    this.registerInclusionResolver('destino', this.destino.inclusionResolver);
    this.origen = this.createBelongsToAccessorFor('origen', aeropuertoRepositoryGetter,);
    this.registerInclusionResolver('origen', this.origen.inclusionResolver);
  }
}

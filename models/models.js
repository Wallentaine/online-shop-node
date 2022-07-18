const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING, unique: true},
    balance: {type: DataTypes.DOUBLE},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const BasketFilm = sequelize.define('basket_film', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Film = sequelize.define('film', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    alternativeName: {type: DataTypes.STRING, unique: true, allowNull: false},
    poster: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    year: {type: DataTypes.DATE, allowNull: false},
    rating: {type: DataTypes.DOUBLE, defaultValue: 0},
    playTime: {type: DataTypes.INTEGER, defaultValue: 0},
    price: {type: DataTypes.DOUBLE, defaultValue: 0}
})

const Genre = sequelize.define('genre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false}
})

const GenreFilm = sequelize.define('genre_film', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Scenarist = sequelize.define('scenarist', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const ScenaristFilm = sequelize.define('scenarist_film', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Actor = sequelize.define('actor', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const ActorFilm = sequelize.define('actor_film', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Producer = sequelize.define('producer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const ProducerFilm = sequelize.define('producer_film', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Country = sequelize.define('country', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const CountryFilm = sequelize.define('country_film', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Liked = sequelize.define('liked', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Blocked = sequelize.define('blocked', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Purchased = sequelize.define('purchased', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, defaultValue: 0}
})



User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketFilm)
BasketFilm.belongsTo(Basket)

Film.hasMany(BasketFilm)
BasketFilm.belongsTo(Film)

User.hasMany(Liked)
Liked.belongsTo(User)

Film.hasMany(Liked)
Liked.belongsTo(Film)

User.hasMany(Blocked)
Blocked.belongsTo(User)

Film.hasMany(Blocked)
Blocked.belongsTo(Film)

User.hasMany(Purchased)
Purchased.belongsTo(User)

Film.hasMany(Purchased)
Purchased.belongsTo(Film)

User.hasMany(Rating)
Rating.belongsTo(User)

Film.hasMany(Rating)
Rating.belongsTo(Film)

Genre.hasMany(GenreFilm)
GenreFilm.belongsTo(Genre)

Film.hasMany(GenreFilm)
GenreFilm.belongsTo(Film)

Scenarist.hasMany(ScenaristFilm)
ScenaristFilm.belongsTo(Scenarist)

Film.hasMany(ScenaristFilm)
ScenaristFilm.belongsTo(Film)

Actor.hasMany(ActorFilm)
ActorFilm.belongsTo(Actor)

Film.hasMany(ActorFilm)
ActorFilm.belongsTo(Film)

Producer.hasMany(ProducerFilm)
ProducerFilm.belongsTo(Producer)

Film.hasMany(ProducerFilm)
ProducerFilm.belongsTo(Film)

Country.hasMany(CountryFilm)
CountryFilm.belongsTo(Film)

Film.hasMany(CountryFilm)
CountryFilm.belongsTo(Film)

module.exports = {
    User,
    Basket,
    BasketFilm,
    Film,
    Genre,
    GenreFilm,
    Scenarist,
    ScenaristFilm,
    Actor,
    ActorFilm,
    Producer,
    ProducerFilm,
    Country,
    CountryFilm,
    Liked,
    Blocked,
    Purchased,
    Rating,
}
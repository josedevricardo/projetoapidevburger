import Sequelize from 'sequelize';
const { Model } = Sequelize;

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                price: Sequelize.INTEGER,
                category: Sequelize.STRING,
                path: Sequelize.STRING,
                url: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `http://localhost:3001/product-file/${this.path}`;
                    },
                },
                createdAt: {
                    type: Sequelize.DATE,
                    field: 'created_at',
                    defaultValue: Sequelize.NOW,
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    field: 'updated_at',
                    defaultValue: Sequelize.NOW,
                }
            },
            {
                sequelize,
                tableName: 'products',
                timestamps: true,
            }
        );
    }
}

export default Product;

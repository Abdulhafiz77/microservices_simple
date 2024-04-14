import { StatusIdEnum } from './../../../user-service/src/models/enums/status.enum';
import { pgPoolQuery, ProductModel } from '..';

export class ProductRepository {

    static async getAll(params: any): Promise<ProductModel[]> {

        const parameters: any = [];
        let pagination = '';
        let filter = '';

        if (params.limit && !isNaN(params.page)) {
            parameters.push(params.limit, (params.page - 1) * params.limit);
            pagination = ` LIMIT $1 OFFSET $2`;
        }

        const sql = `select p.id,
                            p.name,
                            p.price,
                            p.user_id,
                            p.created_at,
                            p.updated_at,
                            count(*) over() as count
                    from public.product as p
                    join user u on u.id = p.user_id 
                    where p.status = ${StatusIdEnum.ACTIVE} ${filter}
                    order by p.created_at desc ${pagination};`

        const result = await pgPoolQuery(sql, parameters);
        return result.rows
    }

    static async getById(id: number): Promise<ProductModel> {
        const sql = `select p.id,
                            p.name,
                            p.price,
                            p.user_id,
                            p.created_at,
                            p.updated_at
                    from public.product as p
                    join user u on u.id = p.user_id 
                        where p.status = ${StatusIdEnum.ACTIVE} and p.id = $1`

        const result = await pgPoolQuery(sql, [id]);

        return result.rows[0]
    }

    static async create(params: ProductModel): Promise<ProductModel> {
        const sql = `INSERT INTO public.product (user_id, name, price)
                      VALUES ($1, $2, $3) RETURNING *;`
        const result = await pgPoolQuery(sql, [params.user_id, params.name, params.price]);

        return result.rows[0];
    }

    static async update(params: ProductModel): Promise<ProductModel> {

        const sql = `update public.product set user_id = $1,
                      name = $2,
                      price = $3,
                      status = $4,
                      updated_at = NOW()
                      where id = $5 RETURNING *;`
        const result = await pgPoolQuery(sql, [params.user_id, params.name, params.price, params.status, params.id]);

        return result.rows[0];
    }

    static async delete(id: number): Promise<void> {
        const sql = `UPDATE public.product SET status = ${StatusIdEnum.DELETED} where id = $1`;
        await pgPoolQuery(sql, [id]);

    }

}

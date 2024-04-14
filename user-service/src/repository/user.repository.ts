import { pgPoolQuery, UserModel, StatusIdEnum } from '..';

export class UserRepository {

    static async getAll(params: any): Promise<UserModel[]> {

        const parameters: any = [];
        let pagination = '';
        let filter = '';

        if (params.limit && !isNaN(params.page)) {
            parameters.push(params.limit, (params.page - 1) * params.limit);
            pagination = ` LIMIT $1 OFFSET $2`;
        }

        const sql = `select u.id,
                            u.first_name,
                            u.last_name,
                            u.middle_name,
                            u.phone,
                            u.email, 
                            u.password,
                            u.created_at,
                            u.updated_at,
                            count(*) over() as count
                    from public.user as u
                    where u.status = ${StatusIdEnum.ACTIVE} ${filter}
                    order by u.created_at desc ${pagination};`

        const result = await pgPoolQuery(sql, parameters);
        return result.rows
    }

    static async getById(id: number): Promise<UserModel> {
        const sql = `select u.id,
                            u.first_name,
                            u.last_name,
                            u.middle_name,
                            u.phone,
                            u.email, 
                            u.password,
                            u.created_at,
                            u.updated_at
                    from public.user as u
                        where u.status = ${StatusIdEnum.ACTIVE} and u.id = $1`

        const result = await pgPoolQuery(sql, [id]);

        return result.rows[0]
    }

    static async create(params: UserModel): Promise<UserModel> {
        const sql = `INSERT INTO public.user (first_name, last_name, middle_name, phone, email, password)
                      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
        const result = await pgPoolQuery(sql, [params.first_name, params.last_name, params.middle_name,
                                               params.phone, params.email, params.password]);

        return result.rows[0];
    }

    static async update(params: UserModel): Promise<UserModel> {

        const sql = `update public.user set first_name = $1,
                      last_name = $2,
                      middle_name = $3,
                      phone = $4,
                      email = $5,
                      password = $6,
                      status = $7,
                      updated_at = NOW()
                      where id = $8 RETURNING *;`
        const result = await pgPoolQuery(sql, [params.first_name, params.last_name, params.middle_name,
                                    params.phone, params.email, params.password, params.status, params.id]);

        return result.rows[0];
    }

    static async delete(id: number): Promise<void> {
        const sql = `UPDATE public.user SET status = ${StatusIdEnum.DELETED} where id = $1`;
        await pgPoolQuery(sql, [id]);

    }

}

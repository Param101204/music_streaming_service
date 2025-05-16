// userService.js
import db from './db.js';

export const findUserByEmail = async (email) => {
    const { data, error } = await db
        .from('users')
        .select('*')
        .eq('email_id', email);

    if (error) throw error;
    return data;
};

export const createUser = async (username, email, password, dob) => {
    const { data, error } = await db
        .from('users')
        .insert([
            {
                username: username,
                email_id: email,
                password: password,
                dob: dob
            }
        ]);

    if (error) throw error;
    return data;
};

export const currentUser = async () => {
    const { data, error } = await db
        .from('users')
        .select('*')
        .order('user_id', { ascending: false })
        .limit(1);

    if (error) throw error;
    return data;
};

export const insertPhones = async (userID, phones) => {
    const rows = phones.map(phone => ({
        user_id: userID,
        mobile_no: phone
    }));

    const { data, error } = await db
        .from('mobile_numbers')
        .insert(rows);

    if (error) throw error;
    return data;
};

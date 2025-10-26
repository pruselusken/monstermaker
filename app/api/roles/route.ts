import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';

export async function GET() {
  console.log('GETTING Roles!');
  try {
  console.log('GETTING Connection!');
    const pool = await getConnection();
    console.log('Got connection:', pool);
    const result = await pool.request().query(`
      SELECT * FROM roles
      ORDER BY name
    `);
  console.log('Got result:', result);

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error('Error fetching roles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch roles' },
      { status: 500 }
    );
  }
}

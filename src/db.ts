import { Pool } from 'pg';

export const db = new Pool({
	connectionString:
		'postgresql://neondb_owner:npg_X3yWmxYJi8jI@ep-billowing-scene-ahzod29c-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
});

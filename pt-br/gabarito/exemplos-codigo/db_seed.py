import sqlite3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
FIXTURE = ROOT / 'fixtures' / 'usuarios-teste.json'
DB_PATH = ROOT / 'gabarito' / 'exemplos-codigo' / 'test_db.sqlite'

def seed():
    with open(FIXTURE, 'r', encoding='utf-8') as f:
        users = json.load(f)

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT,
        role TEXT
    )
    ''')
    cur.execute('DELETE FROM users')
    for u in users:
        cur.execute('INSERT INTO users (id, name, email, role) VALUES (?, ?, ?, ?)',
                    (u.get('id'), u.get('name'), u.get('email'), u.get('role')))
    conn.commit()
    conn.close()
    print(f'Seeded {len(users)} users into {DB_PATH}')

if __name__ == '__main__':
    seed()

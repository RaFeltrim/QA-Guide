#!/usr/bin/env python3
"""
Template: bruno-to-zephyr-template.py

Descrição:
- Script de exemplo que mostra como consumir um relatório do Bruno (JUnit/JSON) e publicar execuções no Zephyr via API.

ATENÇÃO: Este é um template. Você deve preencher `ZEPHYR_BASE_URL`, `ZEPHYR_API_TOKEN` e adaptar endpoints conforme sua instalação (Cloud/Server).
"""
import os
import sys
import json
import xml.etree.ElementTree as ET
import requests

ZEPHYR_BASE = os.getenv('ZEPHYR_BASE_URL')
ZEPHYR_TOKEN = os.getenv('ZEPHYR_API_TOKEN')
PROJECT = os.getenv('ZEPHYR_PROJECT_KEY')
CYLENAME = os.getenv('ZEPHYR_CYCLE_NAME', 'automated')

HEADERS = {
    'Authorization': f'Bearer {ZEPHYR_TOKEN}' if ZEPHYR_TOKEN else '',
    'Content-Type': 'application/json'
}

def parse_junit(path):
    """Parse um arquivo JUnit XML e retorna lista de casos com nome e status."""
    tree = ET.parse(path)
    root = tree.getroot()
    results = []
    for testcase in root.iter('testcase'):
        name = testcase.attrib.get('name')
        failure = testcase.find('failure')
        status = 'FAIL' if failure is not None else 'PASS'
        results.append({'name': name, 'status': status})
    return results

def parse_json(path):
    with open(path, 'r', encoding='utf8') as f:
        return json.load(f)

def find_zephyr_test_id(test_name, mapping=None):
    """Placeholder: mapear nome de teste Bruno para zephyr_id.
    mapping pode ser um dict carregado de um arquivo.
    """
    if mapping and test_name in mapping:
        return mapping[test_name]
    # fallback: tentar extrair zephyr id do nome do teste (ex: 'Login test [Z-1234]')
    import re
    m = re.search(r'Z-?\d+', test_name)
    return m.group(0) if m else None

def create_execution(zephyr_test_id, status, comment=None):
    """Template: criar/atualizar execução no Zephyr via API.
    Endpoint e payload variam entre Zephyr Cloud/Server — adapte conforme sua API.
    """
    if not ZEPHYR_BASE or not ZEPHYR_TOKEN or not PROJECT:
        print('ZEPHYR_BASE_URL / ZEPHYR_API_TOKEN / ZEPHYR_PROJECT_KEY must be set')
        return False
    # Exemplo fictício (substituir pelo endpoint real)
    url = f"{ZEPHYR_BASE}/rest/zephyr/latest/execution"
    payload = {
        'projectKey': PROJECT,
        'testId': zephyr_test_id,
        'status': status,
        'cycle': CYLENAME,
        'comment': comment or 'Automated result from Bruno'
    }
    print(f'POST {url} -> payload keys: {list(payload.keys())}')
    # resp = requests.post(url, headers=HEADERS, json=payload)
    # print(resp.status_code, resp.text)
    # return resp.ok
    return True

def main():
    import argparse
    parser = argparse.ArgumentParser(description='Template: publish Bruno results to Zephyr (dry-run supported)')
    parser.add_argument('report', help='Path to Bruno report (JUnit XML or JSON)')
    parser.add_argument('mapping', nargs='?', help='Optional mapping JSON file (test name -> zephyr_id)')
    parser.add_argument('--dry-run', action='store_true', help='Print payloads without performing HTTP requests')
    args = parser.parse_args()

    mapping = None
    if args.mapping:
        with open(args.mapping, 'r', encoding='utf8') as f:
            mapping = json.load(f)

    if args.report.endswith('.xml'):
        results = parse_junit(args.report)
    else:
        results = parse_json(args.report)

    for r in results:
        name = r.get('name') if isinstance(r, dict) else r
        status = r.get('status', 'PASS')
        zid = find_zephyr_test_id(name, mapping)
        if not zid:
            print(f'No zephyr id found for test: {name} — skipping')
            continue
        if args.dry_run:
            print(f'[DRY-RUN] Would create/update execution for {zid} -> {status} (test: {name})')
            continue
        ok = create_execution(zid, status, comment=f'Automated: {name}')
        print(f'Execution update for {zid}: {"OK" if ok else "FAILED"}')

if __name__ == '__main__':
    main()

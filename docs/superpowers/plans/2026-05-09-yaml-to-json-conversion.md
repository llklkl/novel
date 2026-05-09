# YAML to JSON Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert all 27 YAML code blocks in `.opencode/skills` to JSON format

**Architecture:** Temporary Python script scans Markdown files, extracts YAML blocks using regex, parses with PyYAML, converts to JSON with indent=2, replaces YAML blocks in-place, generates conversion report

**Tech Stack:** Python 3, PyYAML, json (stdlib), re (stdlib), pathlib (stdlib)

---

## File Structure

| File | Purpose | Action |
|------|---------|--------|
| `C:\Users\blue_\AppData\Local\Temp\opencode\yaml_to_json.py` | Conversion script (temporary) | Create (not committed) |
| `.gitignore` | Ensure script/venv not tracked | Modify |
| `.opencode/skills/**/*.md` (19 files) | YAML → JSON conversion | Modify |

**Files change together**: All Markdown files modified together, script isolated in temp directory

---

## Task Breakdown

### Task 1: Prepare Python Virtual Environment

**Files:**
- Create: `.venv/` (project root, not committed)
- Modify: None

- [ ] **Step 1: Create virtual environment**

```powershell
python -m venv .venv
```

Expected: `.venv` directory created in project root

- [ ] **Step 2: Activate virtual environment (Windows)**

```powershell
.venv\Scripts\Activate.ps1
```

Expected: PowerShell prompt shows `(.venv)` prefix

- [ ] **Step 3: Install PyYAML dependency**

```powershell
pip install pyyaml
```

Expected: `Successfully installed pyyaml-X.Y.Z`

- [ ] **Step 4: Verify installation**

```powershell
python -c "import yaml; print('PyYAML OK')"
```

Expected: Output "PyYAML OK"

---

### Task 2: Update .gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add entries to .gitignore**

Add to `.gitignore` (append if file exists, create if not):

```
# Python virtual environment
.venv/

# Temporary conversion script (in temp directory, but double-check)
scripts/yaml_to_json.py

# Python bytecode
*.pyc
__pycache__/
```

- [ ] **Step 2: Verify .gitignore updated**

```powershell
git status --short
```

Expected: `.venv/` NOT in git status output

- [ ] **Step 3: Commit .gitignore update**

```powershell
git add .gitignore
git commit -m "chore: add .venv and temp script to gitignore"
```

Expected: Commit created

---

### Task 3: Write Conversion Script - Scan Markdown Files

**Files:**
- Create: `C:\Users\blue_\AppData\Local\Temp\opencode\yaml_to_json.py`

- [ ] **Step 1: Write script header and imports**

Create `C:\Users\blue_\AppData\Local\Temp\opencode\yaml_to_json.py`:

```python
#!/usr/bin/env python3
"""
YAML to JSON Conversion Script
Converts all YAML code blocks in .opencode/skills Markdown files to JSON format.
"""

import re
import json
import yaml
from pathlib import Path
from typing import List, Tuple

# Target directory
SKILLS_DIR = Path("E:/workspace/repos/novel/.opencode/skills")

# Report tracking
modified_files = []
total_yaml_blocks = 0
total_converted_blocks = 0
errors = []
```

- [ ] **Step 2: Write file scanner function**

Append to script:

```python
def find_markdown_files(directory: Path) -> List[Path]:
    """Find all Markdown files in skills directory."""
    md_files = []
    for pattern in ["**/SKILL.md", "**/reference/*.md"]:
        md_files.extend(directory.glob(pattern))
    return sorted(md_files)

def read_file(filepath: Path) -> str:
    """Read file content."""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath: Path, content: str) -> None:
    """Write file content."""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
```

- [ ] **Step 3: Test scanner function**

Add test code to script (temporary, for verification):

```python
if __name__ == "__main__":
    # Test scanner
    md_files = find_markdown_files(SKILLS_DIR)
    print(f"Found {len(md_files)} Markdown files:")
    for f in md_files[:5]:  # Show first 5
        print(f"  - {f.relative_to(SKILLS_DIR)}")
```

Run:

```powershell
python C:\Users\blue_\AppData\Local\Temp\opencode\yaml_to_json.py
```

Expected: Output shows "Found X Markdown files" (should be ~30 files including SKILL.md and reference/*.md)

- [ ] **Step 4: Remove test code after verification**

Remove the test code block from script (keep imports and functions only).

---

### Task 4: Write Conversion Script - Extract YAML Blocks

**Files:**
- Modify: `C:\Users\blue_\AppData\Local\Temp\opencode\yaml_to_json.py`

- [ ] **Step 1: Write YAML extraction function**

Append to script:

```python
def extract_yaml_blocks(content: str) -> List[Tuple[str, str]]:
    """
    Extract all YAML code blocks from Markdown content.
    Returns list of tuples: (full_block_with_fence, yaml_content_only)
    """
    pattern = r'```yaml\s*\n(.*?)\n```'
    matches = re.findall(pattern, content, re.DOTALL)
    
    # Also capture the full block (including fences) for replacement
    full_blocks = re.finditer(pattern, content, re.DOTALL)
    
    results = []
    for match in full_blocks:
        full_block = match.group(0)  # ```yaml ... ```
        yaml_content = match.group(1)  # content inside
        results.append((full_block, yaml_content))
    
    return results
```

- [ ] **Step 2: Test extraction on one file**

Add test code:

```python
if __name__ == "__main__":
    # Test extraction on one file
    test_file = SKILLS_DIR / "check-character" / "reference" / "check-dimensions.md"
    content = read_file(test_file)
    yaml_blocks = extract_yaml_blocks(content)
    print(f"Found {len(yaml_blocks)} YAML blocks in {test_file.name}")
    if yaml_blocks:
        print(f"First block preview (first 100 chars):\n{yaml_blocks[0][1][:100]}")
```

Run:

```powershell
python C:\Users\blue_\AppData\Local\Temp\opencode\yaml_to_json.py
```

Expected: Output shows "Found X YAML blocks" and preview of first block

- [ ] **Step 3: Remove test code**

Remove test code after verification.

---

### Task 5: Write Conversion Script - YAML to JSON Conversion

**Files:**
- Modify: `C:\Users\blue_\AppData\Local\Temp\opencode\yaml_to_json.py`

- [ ] **Step 1: Write YAML-to-JSON conversion function**

Append to script:

```python
def convert_yaml_to_json(yaml_content: str) -> str:
    """
    Convert YAML content to formatted JSON.
    Handles special YAML features (multi-line text, comments, anchors).
    """
    try:
        # Parse YAML
        yaml_data = yaml.safe_load(yaml_content)
        
        # Convert to JSON with indent=2, preserve unicode
        json_str = json.dumps(
            yaml_data,
            indent=2,
            ensure_ascii=False,
            separators=(',', ': ')  # Compact separators with space after colon
        )
        
        return json_str
    except yaml.YAMLError as e:
        # Track error for reporting
        errors.append(f"YAML parse error: {str(e)[:100]}")
        return None  # Signal conversion failure
```

- [ ] **Step 2: Test conversion on sample YAML**

Add test code:

```python
if __name__ == "__main__":
    # Test conversion
    test_yaml = '''
characters:
  - name: "李寻"
    role: "protagonist"
    traits: ["冷静", "理性"]
    motivation: "守护意识自由"
'''
    json_result = convert_yaml_to_json(test_yaml)
    print("Converted JSON:")
    print(json_result)
    
    # Verify JSON parses
    import json
    parsed = json.loads(json_result)
    print(f"\nParsed successfully: {parsed['characters'][0]['name']}")
```

Run:

```powershell
python C:\Users\blue_\AppData\Local\Temp\opencode\yaml_to_json.py
```

Expected: JSON output with correct structure, "李寻" in parsed output

- [ ] **Step 3: Remove test code**

Remove test code after verification.

---

### Task 6: Write Conversion Script - Replace YAML Blocks

**Files:**
- Modify: `C:\Users\blue_\AppData\Local\Temp\opencode\yaml_to_json.py`

- [ ] **Step 1: Write replacement function**

Append to script:

```python
def replace_yaml_with_json(content: str, yaml_block: str, json_str: str) -> str:
    """
    Replace YAML code block with JSON code block in Markdown content.
    """
    json_block = f'```json\n{json_str}\n```'
    return content.replace(yaml_block, json_block, 1)  # Replace first occurrence only

def process_file(filepath: Path) -> Tuple[bool, int]:
    """
    Process single Markdown file: extract YAML, convert to JSON, replace.
    Returns: (modified, blocks_converted)
    """
    content = read_file(filepath)
    yaml_blocks = extract_yaml_blocks(content)
    
    if not yaml_blocks:
        return (False, 0)
    
    blocks_converted = 0
    new_content = content
    
    for yaml_block, yaml_content in yaml_blocks:
        json_str = convert_yaml_to_json(yaml_content)
        
        if json_str:
            new_content = replace_yaml_with_json(new_content, yaml_block, json_str)
            blocks_converted += 1
        else:
            # Conversion failed, keep original YAML
            errors.append(f"Failed to convert block in {filepath.name}")
    
    if blocks_converted > 0:
        write_file(filepath, new_content)
        return (True, blocks_converted)
    
    return (False, 0)
```

- [ ] **Step 2: Test replacement on one file**

Add test code:

```python
if __name__ == "__main__":
    # Test on one file
    test_file = SKILLS_DIR / "check-character" / "reference" / "check-dimensions.md"
    modified, blocks = process_file(test_file)
    print(f"File: {test_file.name}")
    print(f"Modified: {modified}, Blocks converted: {blocks}")
    
    # Verify result
    content = read_file(test_file)
    if '```json' in content:
        print("SUCCESS: YAML replaced with JSON")
    else:
        print("ERROR: No JSON block found")
```

Run:

```powershell
python C:\Users\blue_\AppData\Local\Temp\opencode\yaml_to_json.py
```

Expected: "Modified: True", "Blocks converted: X", "SUCCESS: YAML replaced with JSON"

- [ ] **Step 3: Verify converted file manually**

```powershell
cat .opencode/skills/check-character/reference/check-dimensions.md
```

Expected: See ` ```json ` code blocks instead of ` ```yaml `

- [ ] **Step 4: Restore test file (revert)**

```powershell
git checkout .opencode/skills/check-character/reference/check-dimensions.md
```

Expected: File restored to original YAML version

- [ ] **Step 5: Remove test code**

Remove test code after verification.

---

### Task 7: Write Conversion Script - Batch Process and Report

**Files:**
- Modify: `C:\Users\blue_\AppData\Local\Temp\opencode\yaml_to_json.py`

- [ ] **Step 1: Write main conversion loop**

Append to script:

```python
def convert_all_files():
    """Convert all Markdown files in skills directory."""
    global modified_files, total_yaml_blocks, total_converted_blocks
    
    md_files = find_markdown_files(SKILLS_DIR)
    
    print(f"Scanning {len(md_files)} Markdown files...")
    
    for filepath in md_files:
        modified, blocks = process_file(filepath)
        total_yaml_blocks += len(extract_yaml_blocks(read_file(filepath)))
        
        if modified:
            modified_files.append(filepath)
            total_converted_blocks += blocks
            print(f"  ✓ {filepath.relative_to(SKILLS_DIR)}: {blocks} blocks converted")
    
    print(f"\nConversion complete!")
    print(f"  Files modified: {len(modified_files)}")
    print(f"  YAML blocks found: {total_yaml_blocks}")
    print(f"  JSON blocks created: {total_converted_blocks}")
    
    if errors:
        print(f"\n⚠ Errors encountered: {len(errors)}")
        for error in errors[:5]:  # Show first 5 errors
            print(f"  - {error}")

if __name__ == "__main__":
    convert_all_files()
```

- [ ] **Step 2: Run full conversion**

```powershell
python C:\Users\blue_\AppData\Local\Temp\opencode\yaml_to_json.py
```

Expected: Output shows:
- "Scanning X Markdown files..."
- List of modified files with block counts
- "Conversion complete!" summary
- Files modified: 19+
- YAML blocks found: 27
- JSON blocks created: 27

---

### Task 8: Verify Conversion Results

**Files:**
- None (verification only)

- [ ] **Step 1: Check git status for modified files**

```powershell
git status --short | Measure-Object -Line
```

Expected: 19+ files modified (all `.opencode/skills/**/*.md` files)

- [ ] **Step 2: Verify no YAML blocks remain**

```powershell
Get-ChildItem -Path ".opencode\skills" -Recurse -Filter "*.md" | Select-String -Pattern "```yaml" | Measure-Object | Select-Object Count
```

Expected: Count = 0 (no YAML blocks found)

- [ ] **Step 3: Count JSON blocks created**

```powershell
Get-ChildItem -Path ".opencode\skills" -Recurse -Filter "*.md" | Select-String -Pattern "```json" | Measure-Object | Select-Object Count
```

Expected: Count = 27 (all YAML converted to JSON)

- [ ] **Step 4: Verify JSON syntax in random file**

Pick random file and verify JSON parses:

```powershell
# Read one file
$file = Get-ChildItem -Path ".opencode\skills\check-character\reference" -Filter "*.md" | Select-Object -First 1
$content = Get-Content $file.FullName -Raw

# Extract JSON block
$jsonMatch = [regex]::Match($content, "```json\s*\n(.*?)\n```")
if ($jsonMatch.Success) {
    $jsonStr = $jsonMatch.Groups[1].Value
    # Try to parse with Python
    python -c "import json; json.loads('''$jsonStr'''); print('JSON syntax OK')"
}
```

Expected: "JSON syntax OK" (no parse errors)

---

### Task 9: Manual Spot-Check Validation

**Files:**
- None (manual review only)

- [ ] **Step 1: Review 3-5 converted files manually**

Read and verify these specific files:

```powershell
# Check 1: check-character/reference/check-dimensions.md
cat .opencode/skills/check-character/reference/check-dimensions.md

# Check 2: outline-design/reference/plot-design.md
cat .opencode/skills/outline-design/reference/plot-design.md

# Check 3: novel-project/reference/config-templates.md
cat .opencode/skills/novel-project/reference/config-templates.md
```

Expected: 
- All ` ```yaml ` replaced with ` ```json `
- JSON properly indented (2 spaces)
- Field names preserved (snake_case)
- No truncation or missing fields

- [ ] **Step 2: Verify skill functionality**

Test that skills still work (quick check):

```powershell
# Read check-character SKILL.md
cat .opencode/skills/check-character/SKILL.md

# Verify JSON references exist
Select-String -Path ".opencode\skills\check-character\SKILL.md" -Pattern "reference" | Select-Object -First 5
```

Expected: SKILL.md references still valid, JSON blocks present

- [ ] **Step 3: Fix any issues found**

If errors found (JSON syntax errors, missing fields, etc.), manually fix:

```powershell
# Edit specific file if needed
# Example: Fix JSON syntax in check-dimensions.md
code .opencode/skills/check-character/reference/check-dimensions.md
```

Expected: All issues resolved before commit

---

### Task 10: Commit JSON Conversion Results

**Files:**
- Commit: All modified `.opencode/skills/**/*.md` files

- [ ] **Step 1: Review final git status**

```powershell
git status --short
```

Expected: 19+ modified files listed, no `.venv/` or scripts in status

- [ ] **Step 2: Add all modified Markdown files**

```powershell
git add .opencode/skills/**/*.md
```

Expected: Files staged for commit

- [ ] **Step 3: Verify staged files**

```powershell
git diff --cached --stat
```

Expected: Shows all 19+ files with changes (YAML → JSON)

- [ ] **Step 4: Commit with descriptive message**

```powershell
git commit -m "refactor: convert all YAML templates to JSON

Following YAML-to-JSON conversion design spec:
- 27 YAML blocks converted across 19 Markdown files
- JSON format: indent=2, snake_case fields, no comments
- Benefits: eliminates AI format errors, improves parsing reliability
- Files: all .opencode/skills/*/reference/*.md and SKILL.md
- Validation: no YAML blocks remain, all JSON parses successfully

Script location: temp directory (not committed)"
```

Expected: Commit created with message

- [ ] **Step 5: Verify commit**

```powershell
git log -1 --stat
```

Expected: Shows commit with 19+ files changed

- [ ] **Step 6: Clean up virtual environment (optional)**

If no longer needed:

```powershell
Remove-Item -Path ".venv" -Recurse -Force
```

Expected: `.venv` directory removed (not in git)

---

## Self-Review Checklist

After completing plan, verify:

- [ ] **Spec coverage**: All 7 sections in design spec covered by tasks
  - Section 1 (Conversion Scope) → Task 7 (batch process)
  - Section 2 (JSON Structure) → Task 5 (convert function)
  - Section 3 (Conversion Script) → Tasks 3-7 (script building)
  - Section 4 (File Organization) → Task 10 (commit)
  - Section 5 (Execution Process) → Tasks 1-10 (full workflow)
  - Section 6 (Error Handling) → Task 9 (validation)
  - Section 7 (Success Criteria) → Task 8 (verification)

- [ ] **Placeholder scan**: No TBD, TODO, vague instructions in plan
  - All code blocks contain complete code ✓
  - All commands have expected output ✓
  - No "implement later" or "similar to" ✓

- [ ] **Type consistency**: 
  - Function signatures consistent (yaml_content: str → json_str: str) ✓
  - Path handling consistent (Path objects throughout) ✓
  - Return types consistent ((bool, int) tuple) ✓

---

## Execution Notes

**Virtual environment**: Required for PyYAML dependency isolation

**Script location**: `C:\Users\blue_\AppData\Local\Temp\opencode\yaml_to_json.py` (temp directory, auto-excluded from git)

**Backup strategy**: Git provides version control - revert with `git checkout` if needed

**Validation critical**: Task 8-9 ensure conversion correctness before commit

**Total estimated time**: 30-45 minutes (script writing + execution + validation)
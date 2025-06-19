from jinja2 import Environment, FileSystemLoader
import os
import re

# Escaping function
def escape_latex(text):
    latex_special_chars = {
        '&': r'\&',
        '%': r'\%',
        '$': r'\$',
        '#': r'\#',
        '_': r'\_',
        '{': r'\{',
        '}': r'\}',
        '~': r'\textasciitilde{}',
        '^': r'\^{}',
        '\\': r'\textbackslash{}',
    }
    regex = re.compile('|'.join(re.escape(key) for key in latex_special_chars))
    return regex.sub(lambda match: latex_special_chars[match.group()], text)

# Recursive escape of user-provided data
def recursively_escape(obj):
    if isinstance(obj, dict):
        return {k: recursively_escape(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [recursively_escape(elem) for elem in obj]
    elif isinstance(obj, str):
        return escape_latex(obj)
    return obj

# Main rendering function
def generate_latex_from_data(data):
    env = Environment(
        loader=FileSystemLoader('app/templates'),
        block_start_string='{%',
        block_end_string='%}',
        variable_start_string='{{',
        variable_end_string='}}',
        comment_start_string='{#',
        comment_end_string='#}'
    )

    template = env.get_template('latex_template.tex')
    print("Successfully read template")

    sanitized_data = recursively_escape(data)  # 🎯 Apply escape
    rendered_tex = template.render(**sanitized_data)

    output_path = 'app/output/resume.tex'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(rendered_tex)

    return output_path

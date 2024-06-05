{
    'name': 'QR Code Generator',
    'author': 'Adarsh',
    'version': '17.0.1.0.0',
    'summary': 'QR Code Generator',
    'depends': ['base'],
    'data': [
    ],
    'sequence': -104,
    'application': True,
    'assets': {
        'web.assets_backend': [
            'qr_code_generator/static/src/js/qr_code.js',
            'qr_code_generator/static/src/xml/qr_code.xml',
        ],
    },
}

# -*- coding: utf-8 -*-

from odoo import models, api

try:
    import qrcode
except ImportError:
    qrcode = None
try:
    import base64
except ImportError:
    base64 = None
from io import BytesIO


class QrCode(models.Model):
    """Model for Creation of QR code from input text"""
    _name = "qr.code"
    _description = "QR Code Generator"

    @api.model
    def generate_qr_code(self, input_value):
        """ Create and Returns binary representation of the QR code image"""
        if qrcode and base64 and input_value:
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_L,
                box_size=3,
                border=4,
            )
            qr.add_data(input_value)
            qr.make(fit=True)
            img = qr.make_image()
            temp = BytesIO()
            img.save(temp, format="PNG")
            qr_image = base64.b64encode(temp.getvalue())
            return {
                'qr_image': qr_image
            }
        else:
            return 0

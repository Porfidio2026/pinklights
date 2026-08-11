# Carga Documental — Pinklights

Listado de documentos tributarios electrónicos que Pinklights transmitirá.

## 1. Documentos a emitir

Un único tipo de documento:

| Campo | Valor |
|---|---|
| Tipo de DTE | **`01` — Factura Electrónica (Consumidor Final)** |
| Versión | `1` |
| Moneda | `USD` |
| Condición de la operación | `1` (Contado) |
| Modelo de facturación | `1` (Previo) |
| Tipo de transmisión | `1` (Normal) |
| Tipo de establecimiento | `01` |
| Endpoint | `facturacion-electronica/consumidor-final` |

No emitimos por el momento Comprobante de Crédito Fiscal (`03`), Nota de Crédito
(`05`), Nota de Débito (`06`) ni Factura de Sujeto Excluido (`14`).

## 2. Receptor

Todas las ventas son a consumidor final. Se utiliza el receptor genérico:

- `tipo_identificacion`: `12`
- `identificacion`: `9999999999999`
- `nombres`: `CLIENTES VARIOS`
- El correo del comprador se incluye como información adicional para el envío del RIDE.

## 3. Producto y montos

Servicio digital: créditos de visibilidad del perfil en la plataforma Pinklights.
**Todos los precios incluyen IVA** (el IVA se extrae con la fórmula `monto * 13 / 113`).

| Paquete | Duración | Precio (IVA incluido) |
|---|---|---|
| 1 día | 1 día de visibilidad | USD 5.00 |
| 7 días | 7 días de visibilidad | USD 25.00 |
| 30 días | 30 días de visibilidad | USD 75.00 |

Cada DTE contiene **un solo ítem**, con `tipoItem: 2` (servicio) y `uniMedida: 99`.

## 4. Momento y volumen de emisión

- La emisión es **automática**: se dispara desde nuestro webhook de pagos en cuanto
  la pasarela confirma el cobro. Un pago confirmado = un DTE.
- No hay emisión manual ni por lotes.
- Volumen estimado: _(a completar según proyección de ventas)_.

## 5. Estado actual de la integración

Ya transmitimos correctamente al ambiente de pruebas de Hacienda:

```
Sello recibido:    202652C7859334E74E69976656A63F66DB2FY17F
Número de control: DTE-01-M001P760-000000000000008
DTE id (Acatha):   19667
```

El flujo completo funciona: autenticación → creación de la venta → transmisión a
Hacienda → sello → generación del PDF.

## 6. Consultas pendientes

1. **Forma de pago.** Actualmente enviamos `pagos[0].codigo: "01"` (billetes y
   monedas) y `formaPago: EFECTIVO`. Sin embargo los cobros se realizan mediante
   pasarela electrónica (tarjeta / medios digitales), no en efectivo.
   ¿Qué código del catálogo corresponde: `02` (tarjeta débito), `03` (tarjeta
   crédito), `05` (transferencia) u otro? ¿Debe informarse además
   `numPagoElectronico`?
2. **Anulaciones y reembolsos.** Si se reembolsa una compra, ¿corresponde emitir
   Nota de Crédito (`05`) o utilizar el proceso de invalidación de DTE?
3. **Clientes empresa.** ¿Es necesario habilitar Comprobante de Crédito Fiscal
   (`03`) para compradores que requieran crédito fiscal?
4. **Código de ítem.** Necesitamos crear el ítem propio de Pinklights en el
   catálogo. ¿Qué valores corresponden para `linea`, `grupo`, `unidadv` y `tipo`?

---

### Nota interna (no enviar)

El punto 1 es un hallazgo real, no una formalidad: el DTE declara efectivo mientras
el cobro pasa por DitoBanx. Conviene corregirlo antes de producción — es un dato
tributario incorrecto, aunque hoy Hacienda no lo rechace.

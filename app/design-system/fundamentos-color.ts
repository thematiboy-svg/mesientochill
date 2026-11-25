// Fundamentos del sistema de diseño: capa de primitivos, capa semántica y contrastes medidos con la paleta real.
export const PRIMITIVOS = [
 {
  "grupo": "Primario · Verde",
  "nota": "El color de la marca y de la acción. Teal para todo lo que se pulsa; mint como acento del logotipo y detalles.",
  "items": [
   {
    "token": "teal",
    "valor": "#006B5E",
    "rol": "Primario",
    "uso": "Acción, enlaces, eyebrows"
   },
   {
    "token": "mint",
    "valor": "#00A28F",
    "rol": "Primario acento",
    "uso": "Logotipo, puntos, progreso"
   },
   {
    "token": "ink",
    "valor": "#0E2F2B",
    "rol": "Primario oscuro",
    "uso": "Texto, fondo inverso, hover de b1"
   },
   {
    "token": "tint",
    "valor": "#E6F6F3",
    "rol": "Primario claro",
    "uso": "Fondos suaves, estados ok"
   },
   {
    "token": "line2",
    "valor": "#BFDCD6",
    "rol": "Primario borde",
    "uso": "Chips, tarjetas tint"
   }
  ]
 },
 {
  "grupo": "Secundario · Coral",
  "nota": "Calidez y foco. Nunca lleva texto blanco encima: siempre ink.",
  "items": [
   {
    "token": "coral",
    "valor": "#FF9782",
    "rol": "Secundario",
    "uso": "Símbolo, números, foco"
   },
   {
    "token": "coral-hover",
    "valor": "#FF7F66",
    "rol": "Secundario hover",
    "uso": "Hover de elementos coral"
   },
   {
    "token": "blush",
    "valor": "#FFEDE8",
    "rol": "Secundario claro",
    "uso": "Fondos cálidos, error"
   },
   {
    "token": "blush-line",
    "valor": "#F0C9BE",
    "rol": "Secundario borde",
    "uso": "Tarjetas blush, aviso de error"
   },
   {
    "token": "error-fg",
    "valor": "#8A3A26",
    "rol": "Secundario oscuro",
    "uso": "Texto de error"
   }
  ]
 },
 {
  "grupo": "Neutros",
  "nota": "La base de la página: cálidos, nunca grises fríos.",
  "items": [
   {
    "token": "cream",
    "valor": "#FFF9F6",
    "rol": "Neutro 0",
    "uso": "Fondo de página"
   },
   {
    "token": "white",
    "valor": "#FFFFFF",
    "rol": "Neutro 0 bis",
    "uso": "Superficies"
   },
   {
    "token": "chat-bg",
    "valor": "#FBF8F5",
    "rol": "Neutro 5",
    "uso": "Fondo del chat"
   },
   {
    "token": "sand",
    "valor": "#F1EEE9",
    "rol": "Neutro 10",
    "uso": "Fondos arena"
   },
   {
    "token": "slot-full",
    "valor": "#F4EFEB",
    "rol": "Neutro 15",
    "uso": "Hueco completo"
   },
   {
    "token": "line-sand",
    "valor": "#E3DED8",
    "rol": "Neutro 20",
    "uso": "Bordes arena"
   },
   {
    "token": "line",
    "valor": "#E8DDD7",
    "rol": "Neutro 25",
    "uso": "Borde por defecto"
   },
   {
    "token": "rule",
    "valor": "#D9CFC9",
    "rol": "Neutro 30",
    "uso": "Filetes de FAQ"
   },
   {
    "token": "disabled-bg",
    "valor": "#EDE7E2",
    "rol": "Neutro 35",
    "uso": "Fondo deshabilitado"
   }
  ]
 },
 {
  "grupo": "Neutros de texto",
  "nota": "Verdes muy oscuros para que el texto tenga la temperatura de la marca.",
  "items": [
   {
    "token": "ink",
    "valor": "#0E2F2B",
    "rol": "Texto 900",
    "uso": "Texto principal"
   },
   {
    "token": "soft",
    "valor": "#2F4B47",
    "rol": "Texto 800",
    "uso": "Secundario oscuro"
   },
   {
    "token": "muted",
    "valor": "#3B5753",
    "rol": "Texto 700",
    "uso": "Texto secundario"
   },
   {
    "token": "table-head",
    "valor": "#4B625E",
    "rol": "Texto 650",
    "uso": "Cabeceras de tabla"
   },
   {
    "token": "subtle",
    "valor": "#5C6F6B",
    "rol": "Texto 600",
    "uso": "Texto terciario"
   },
   {
    "token": "input-border",
    "valor": "#5E7B76",
    "rol": "Texto 500",
    "uso": "Borde de campos"
   }
  ]
 },
 {
  "grupo": "Estado",
  "nota": "Pocos y discretos: la web no grita.",
  "items": [
   {
    "token": "warn",
    "valor": "#FFF3D6",
    "rol": "Aviso fondo",
    "uso": "Clase completa, avisos"
   },
   {
    "token": "warn-line",
    "valor": "#EBCB7A",
    "rol": "Aviso borde",
    "uso": "Borde del aviso"
   },
   {
    "token": "error-fg",
    "valor": "#8A3A26",
    "rol": "Error texto",
    "uso": "Mensajes de error"
   },
   {
    "token": "tint",
    "valor": "#E6F6F3",
    "rol": "Éxito fondo",
    "uso": "Confirmaciones"
   },
   {
    "token": "teal",
    "valor": "#006B5E",
    "rol": "Éxito texto",
    "uso": "Texto de confirmación"
   }
  ]
 }
] as const

export const SEMANTICOS = [
 {
  "grupo": "Fondo",
  "prefijo": "bg",
  "items": [
   {
    "token": "bg-page",
    "ref": "cream",
    "valor": "#FFF9F6",
    "uso": "Fondo de página por defecto."
   },
   {
    "token": "bg-surface",
    "ref": "white",
    "valor": "#FFFFFF",
    "uso": "Tarjetas, campos, menús, cabecera privada."
   },
   {
    "token": "bg-subtle",
    "ref": "tint",
    "valor": "#E6F6F3",
    "uso": "Sección o tarjeta destacada en verde suave; opción activa."
   },
   {
    "token": "bg-warm",
    "ref": "blush",
    "valor": "#FFEDE8",
    "uso": "Sección o tarjeta cálida; fondo del aviso de error."
   },
   {
    "token": "bg-neutral",
    "ref": "sand",
    "valor": "#F1EEE9",
    "uso": "Tarjeta arena; hover del menú lateral."
   },
   {
    "token": "bg-inverse",
    "ref": "ink",
    "valor": "#0E2F2B",
    "uso": "Pie de página, botón b3, cierre."
   },
   {
    "token": "bg-brand",
    "ref": "teal",
    "valor": "#006B5E",
    "uso": "Botón principal b1, sección oscura, cabecera del chat."
   },
   {
    "token": "bg-accent",
    "ref": "coral",
    "valor": "#FF9782",
    "uso": "Números de pasos, chip coral, avatar."
   },
   {
    "token": "bg-warning",
    "ref": "warn",
    "valor": "#FFF3D6",
    "uso": "Aviso «clase completa»."
   },
   {
    "token": "bg-disabled",
    "ref": "disabled-bg",
    "valor": "#EDE7E2",
    "uso": "Botón o control deshabilitado."
   },
   {
    "token": "bg-track",
    "ref": "track",
    "valor": "#E3EFEC",
    "uso": "Raíl de barras de progreso."
   }
  ]
 },
 {
  "grupo": "Texto",
  "prefijo": "fg",
  "items": [
   {
    "token": "fg-default",
    "ref": "ink",
    "valor": "#0E2F2B",
    "uso": "Titulares y texto principal."
   },
   {
    "token": "fg-muted",
    "ref": "muted",
    "valor": "#3B5753",
    "uso": "Entradillas, descripciones, respuestas."
   },
   {
    "token": "fg-subtle",
    "ref": "subtle",
    "valor": "#5C6F6B",
    "uso": "Texto terciario, «próximamente»."
   },
   {
    "token": "fg-brand",
    "ref": "teal",
    "valor": "#006B5E",
    "uso": "Enlaces, eyebrows, texto de acción."
   },
   {
    "token": "fg-accent",
    "ref": "mint",
    "valor": "#00A28F",
    "uso": "Palabras destacadas en titulares, solo ≥ 24px."
   },
   {
    "token": "fg-inverse",
    "ref": "white",
    "valor": "#FFFFFF",
    "uso": "Texto sobre ink o teal."
   },
   {
    "token": "fg-inverse-muted",
    "ref": "footer-note",
    "valor": "#D5E8E4",
    "uso": "Texto secundario sobre ink o teal."
   },
   {
    "token": "fg-on-accent",
    "ref": "ink",
    "valor": "#0E2F2B",
    "uso": "Texto sobre coral (nunca blanco)."
   },
   {
    "token": "fg-error",
    "ref": "error-fg",
    "valor": "#8A3A26",
    "uso": "Mensajes de error."
   },
   {
    "token": "fg-disabled",
    "ref": "disabled-fg",
    "valor": "#5C5450",
    "uso": "Texto deshabilitado."
   }
  ]
 },
 {
  "grupo": "Borde",
  "prefijo": "border",
  "items": [
   {
    "token": "border-default",
    "ref": "line",
    "valor": "#E8DDD7",
    "uso": "Tarjetas, separadores, tablas (1px)."
   },
   {
    "token": "border-brand",
    "ref": "line2",
    "valor": "#BFDCD6",
    "uso": "Chips, tarjetas tint, aviso ok."
   },
   {
    "token": "border-warm",
    "ref": "blush-line",
    "valor": "#F0C9BE",
    "uso": "Tarjetas blush, aviso de error."
   },
   {
    "token": "border-neutral",
    "ref": "line-sand",
    "valor": "#E3DED8",
    "uso": "Tarjetas sand, píldora de cabecera."
   },
   {
    "token": "border-input",
    "ref": "input-border",
    "valor": "#5E7B76",
    "uso": "Campos de formulario (1,5px)."
   },
   {
    "token": "border-strong",
    "ref": "teal",
    "valor": "#006B5E",
    "uso": "Botones b2/b4, plan destacado (2px)."
   },
   {
    "token": "border-rule",
    "ref": "rule",
    "valor": "#D9CFC9",
    "uso": "Filetes de FAQ."
   },
   {
    "token": "border-warning",
    "ref": "warn-line",
    "valor": "#EBCB7A",
    "uso": "Aviso «clase completa»."
   },
   {
    "token": "focus-ring",
    "ref": "coral",
    "valor": "#FF9782",
    "uso": "Anillo de foco: 3px, separación 3px."
   }
  ]
 },
 {
  "grupo": "Acción",
  "prefijo": "action",
  "items": [
   {
    "token": "action-primary",
    "ref": "teal",
    "valor": "#006B5E",
    "uso": "b1: fondo teal, texto blanco. Hover: ink."
   },
   {
    "token": "action-primary-hover",
    "ref": "ink",
    "valor": "#0E2F2B",
    "uso": "Hover de b1."
   },
   {
    "token": "action-secondary",
    "ref": "teal",
    "valor": "#006B5E",
    "uso": "b2: borde y texto teal, sin fondo. Hover: relleno teal."
   },
   {
    "token": "action-dark",
    "ref": "ink",
    "valor": "#0E2F2B",
    "uso": "b3: fondo ink. Hover: teal."
   },
   {
    "token": "action-surface",
    "ref": "white",
    "valor": "#FFFFFF",
    "uso": "b4: fondo blanco, borde teal. Hover: teal."
   }
  ]
 }
] as const

export const CONTRASTE = [
 {
  "fg": "ink",
  "bg": "cream",
  "fgv": "#0E2F2B",
  "bgv": "#FFF9F6",
  "ratio": 13.8,
  "nivel": "AAA"
 },
 {
  "fg": "ink",
  "bg": "white",
  "fgv": "#0E2F2B",
  "bgv": "#FFFFFF",
  "ratio": 14.4,
  "nivel": "AAA"
 },
 {
  "fg": "ink",
  "bg": "tint",
  "fgv": "#0E2F2B",
  "bgv": "#E6F6F3",
  "ratio": 12.9,
  "nivel": "AAA"
 },
 {
  "fg": "ink",
  "bg": "blush",
  "fgv": "#0E2F2B",
  "bgv": "#FFEDE8",
  "ratio": 12.7,
  "nivel": "AAA"
 },
 {
  "fg": "ink",
  "bg": "sand",
  "fgv": "#0E2F2B",
  "bgv": "#F1EEE9",
  "ratio": 12.4,
  "nivel": "AAA"
 },
 {
  "fg": "muted",
  "bg": "cream",
  "fgv": "#3B5753",
  "bgv": "#FFF9F6",
  "ratio": 7.5,
  "nivel": "AAA"
 },
 {
  "fg": "muted",
  "bg": "white",
  "fgv": "#3B5753",
  "bgv": "#FFFFFF",
  "ratio": 7.9,
  "nivel": "AAA"
 },
 {
  "fg": "muted",
  "bg": "tint",
  "fgv": "#3B5753",
  "bgv": "#E6F6F3",
  "ratio": 7.0,
  "nivel": "AAA"
 },
 {
  "fg": "teal",
  "bg": "cream",
  "fgv": "#006B5E",
  "bgv": "#FFF9F6",
  "ratio": 6.2,
  "nivel": "AA"
 },
 {
  "fg": "teal",
  "bg": "white",
  "fgv": "#006B5E",
  "bgv": "#FFFFFF",
  "ratio": 6.4,
  "nivel": "AA"
 },
 {
  "fg": "teal",
  "bg": "tint",
  "fgv": "#006B5E",
  "bgv": "#E6F6F3",
  "ratio": 5.8,
  "nivel": "AA"
 },
 {
  "fg": "white",
  "bg": "teal",
  "fgv": "#FFFFFF",
  "bgv": "#006B5E",
  "ratio": 6.4,
  "nivel": "AA"
 },
 {
  "fg": "white",
  "bg": "ink",
  "fgv": "#FFFFFF",
  "bgv": "#0E2F2B",
  "ratio": 14.4,
  "nivel": "AAA"
 },
 {
  "fg": "footer-note",
  "bg": "ink",
  "fgv": "#D5E8E4",
  "bgv": "#0E2F2B",
  "ratio": 11.3,
  "nivel": "AAA"
 },
 {
  "fg": "ink",
  "bg": "coral",
  "fgv": "#0E2F2B",
  "bgv": "#FF9782",
  "ratio": 6.8,
  "nivel": "AA"
 },
 {
  "fg": "mint",
  "bg": "cream",
  "fgv": "#00A28F",
  "bgv": "#FFF9F6",
  "ratio": 3.1,
  "nivel": "AA grande"
 },
 {
  "fg": "subtle",
  "bg": "white",
  "fgv": "#5C6F6B",
  "bgv": "#FFFFFF",
  "ratio": 5.3,
  "nivel": "AA"
 },
 {
  "fg": "error-fg",
  "bg": "blush",
  "fgv": "#8A3A26",
  "bgv": "#FFEDE8",
  "ratio": 6.8,
  "nivel": "AA"
 },
 {
  "fg": "disabled-fg",
  "bg": "disabled-bg",
  "fgv": "#5C5450",
  "bgv": "#EDE7E2",
  "ratio": 6.0,
  "nivel": "AA"
 },
 {
  "fg": "input-border",
  "bg": "white",
  "fgv": "#5E7B76",
  "bgv": "#FFFFFF",
  "ratio": 4.6,
  "nivel": "AA"
 },
 {
  "fg": "white",
  "bg": "coral",
  "fgv": "#FFFFFF",
  "bgv": "#FF9782",
  "ratio": 2.1,
  "nivel": "No"
 },
 {
  "fg": "coral",
  "bg": "cream",
  "fgv": "#FF9782",
  "bgv": "#FFF9F6",
  "ratio": 2.0,
  "nivel": "No"
 }
] as const

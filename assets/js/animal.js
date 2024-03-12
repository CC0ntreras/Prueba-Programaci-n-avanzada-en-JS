// Definición de la clase base Animal
export class Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    this._nombre = nombre;
    this._edad = edad;
    this._img = img;
    this._comentarios = comentarios;
    this._sonido = sonido;
  }

  get nombre() {
    return this._nombre;
  }

  get edad() {
    return this._edad;
  }

  get img() {
    return this._img;
  }

  set comentarios(comentario) {
    this._comentarios = comentario;
  }

  get comentarios() {
    return this._comentarios;
  }
  get sonido() {
    return this._sonido;
  }

  emitirSonido() {
    // Este método será sobrescrito en cada subclase
  }
}

// Clase Leon
export class Leon extends Animal {
  rugir() {
    this.emitirSonido();
  }
}

// Clase Lobo
export class Lobo extends Animal {
  aullar() {
    this.emitirSonido();
  }
}

// Clase Oso
export class Oso extends Animal {
  gruñir() {
    this.emitirSonido();
  }
}

// Clase Serpiente
export class Serpiente extends Animal {
  sisear() {
    this.emitirSonido();
  }
}

// Clase Aguila
export class Aguila extends Animal {
  chillar() {
    this.emitirSonido();
  }
}

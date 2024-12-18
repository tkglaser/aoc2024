const enum Opcode {
  adv = 0,
  bxl = 1,
  bst = 2,
  jnz = 3,
  bxc = 4,
  out = 5,
  bdv = 6,
  cdv = 7,
}

export function clearCache() {
  cache = {};
}

let cache: Record<number, number[]> = {};

export class ThreeBitComputer {
  private ip = 0;
  private a: number;
  private b: number;
  private c: number;
  private program: number[];
  public output: number[] = [];

  constructor(initial: { a: number; b: number; c: number; p: number[] }) {
    this.a = initial.a;
    this.b = initial.b;
    this.c = initial.c;
    this.program = initial.p;
  }

  tick(): boolean {
    const opcode = this.program[this.ip] as Opcode;
    const operand = this.program[this.ip + 1];

    if (this.ip === 0 && cache[this.a]) {
      this.output.push(...cache[this.a]);
      return false;
    }

    switch (opcode) {
      case Opcode.adv:
        this.a = Math.floor(this.a / 2 ** this.combo(operand));
        break;
      case Opcode.bxl:
        this.b = this.b ^ operand;
        break;
      case Opcode.bst:
        this.b = this.combo(operand) % 8;
        break;
      case Opcode.jnz:
        if (this.a) {
          this.ip = operand - 2; // compensate for +2 at the end
        }
        break;
      case Opcode.bxc:
        this.b = this.b ^ this.c;
        break;
      case Opcode.out:
        this.output.push(this.combo(operand) % 8);
        break;
      case Opcode.bdv:
        this.b = Math.floor(this.a / 2 ** this.combo(operand));
        break;
      case Opcode.cdv:
        this.c = Math.floor(this.a / 2 ** this.combo(operand));
        break;
      default:
        return false; //halt
    }

    this.ip = this.ip + 2;
    return true;
  }

  renderProgram() {
    const result = [];
    const renderCombo = (operand: number) => {
      if (operand < 4) {
        return operand;
      }
      if (operand === 4) {
        return "A";
      }
      if (operand === 5) {
        return "B";
      }
      if (operand === 6) {
        return "C";
      }
    };

    for (let i = 0; i < this.program.length; i = i + 2) {
      const opcode = this.program[i] as Opcode;
      const operand = this.program[i + 1];
      switch (opcode) {
        case Opcode.adv:
          result.push(
            `ADV ${renderCombo(operand)} | A = A / 2**${renderCombo(operand)}`,
          );
          break;
        case Opcode.bxl:
          result.push(`BXL ${operand} | B = B xor ${operand}`);
          break;
        case Opcode.bst:
          result.push(
            `BST ${renderCombo(operand)} | B = ${renderCombo(operand)}`,
          );
          break;
        case Opcode.jnz:
          result.push(`JNZ ${operand} | A != 0 ? JMP ${operand}`);
          break;
        case Opcode.bxc:
          result.push(`BXC   | B = B xor C`);
          break;
        case Opcode.out:
          result.push(`OUT ${renderCombo(operand)} | `);
          break;
        case Opcode.bdv:
          result.push(
            `BDV ${renderCombo(operand)} | B = A / 2**${renderCombo(operand)}`,
          );
          break;
        case Opcode.cdv:
          result.push(
            `CDV ${renderCombo(operand)} | C = A / 2**${renderCombo(operand)}`,
          );
          break;
      }
    }
    return result.join("\n");
  }

  runToCompletion() {
    const initialA = this.a;
    while (this.tick()) {}
    cache[initialA] = [...this.output];
  }

  private combo(operand: number) {
    if (operand < 4) {
      return operand;
    }
    if (operand === 4) {
      return this.a;
    }
    if (operand === 5) {
      return this.b;
    }
    if (operand === 6) {
      return this.c;
    }
    throw new Error("Invalid program, combo 7");
  }
}

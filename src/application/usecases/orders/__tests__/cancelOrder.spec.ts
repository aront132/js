import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('../../../repositories/pedidosRepository', () => ({
  default: {
    cancelar: vi.fn(),
  },
}));

import PedidosRepository from '../../../../infrastructure/repositories/pedidosRepository';
import { cancelOrder } from '../../orders/cancelOrder';

describe('cancelOrder use-case', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('delegates cancellation to PedidosRepository', async () => {
    const fake = { id: "5", estado: 'cancelado', usuarioId: "1", fecha: new Date().toISOString(), total: 10 };
    (PedidosRepository.cancelar as any).mockResolvedValue(fake);

    const res = await cancelOrder("5");

    expect(PedidosRepository.cancelar).toHaveBeenCalledWith("5");
    expect(res).toEqual(fake);
  });
});

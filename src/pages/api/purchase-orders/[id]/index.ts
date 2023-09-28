import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { purchaseOrderValidationSchema } from 'validationSchema/purchase-orders';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  const allowed = await prisma.purchase_order
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  if (!allowed) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  switch (req.method) {
    case 'GET':
      return getPurchaseOrderById();
    case 'PUT':
      return updatePurchaseOrderById();
    case 'DELETE':
      return deletePurchaseOrderById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPurchaseOrderById() {
    const data = await prisma.purchase_order.findFirst(convertQueryToPrismaUtil(req.query, 'purchase_order'));
    return res.status(200).json(data);
  }

  async function updatePurchaseOrderById() {
    await purchaseOrderValidationSchema.validate(req.body);
    const data = await prisma.purchase_order.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deletePurchaseOrderById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.purchase_order.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

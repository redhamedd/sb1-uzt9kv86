import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { formatCurrency } from '../utils/formatters';

interface CostBreakdown {
  purchasePrice: number;
  shippingCost: number;
  packagingCost: number;
  confirmationCost: number;
  returnCost: number;
  sellingPrice: number;
}

const ProductCost: React.FC = () => {
  const [costs, setCosts] = useState<CostBreakdown>({
    purchasePrice: 0,
    shippingCost: 0,
    packagingCost: 0,
    confirmationCost: 0,
    returnCost: 0,
    sellingPrice: 0
  });

  const totalCost = Object.values(costs).reduce((acc, curr) => acc + curr, 0) - costs.sellingPrice;
  const profit = costs.sellingPrice - totalCost;
  const profitMargin = costs.sellingPrice ? (profit / costs.sellingPrice) * 100 : 0;

  const handleInputChange = (field: keyof CostBreakdown) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setCosts(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calculateur de coût</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Calculez le coût total et la marge bénéficiaire de vos produits
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Détails des coûts</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prix d'achat
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-900 dark:text-white"
                value={costs.purchasePrice || ''}
                onChange={handleInputChange('purchasePrice')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Frais de livraison
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-900 dark:text-white"
                value={costs.shippingCost || ''}
                onChange={handleInputChange('shippingCost')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Coût du packaging
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-900 dark:text-white"
                value={costs.packagingCost || ''}
                onChange={handleInputChange('packagingCost')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Frais de confirmation
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-900 dark:text-white"
                value={costs.confirmationCost || ''}
                onChange={handleInputChange('confirmationCost')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Coût de retour estimé
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-900 dark:text-white"
                value={costs.returnCost || ''}
                onChange={handleInputChange('returnCost')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prix de vente
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-900 dark:text-white"
                value={costs.sellingPrice || ''}
                onChange={handleInputChange('sellingPrice')}
              />
            </div>
          </div>
        </Card>

        <Card className="dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Résumé</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Coût total</span>
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {formatCurrency(totalCost)}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Prix de vente</span>
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {formatCurrency(costs.sellingPrice)}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Bénéfice</span>
                <span className={`text-lg font-medium ${profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {formatCurrency(profit)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Marge bénéficiaire</span>
                <span className={`text-lg font-medium ${profitMargin >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {profitMargin.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="primary"
                fullWidth
                leftIcon={<Calculator size={16} />}
              >
                Enregistrer le calcul
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductCost;
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface DataPoint {
  id: string;
  category: string;
  value: number;
  date: string;
  status: 'active' | 'pending' | 'completed';
}

const mockData: DataPoint[] = [
  { id: '1', category: 'Продажи', value: 12500, date: '2024-11', status: 'active' },
  { id: '2', category: 'Маркетинг', value: 8900, date: '2024-11', status: 'active' },
  { id: '3', category: 'Продажи', value: 15200, date: '2024-10', status: 'completed' },
  { id: '4', category: 'Разработка', value: 22100, date: '2024-11', status: 'active' },
  { id: '5', category: 'Маркетинг', value: 7800, date: '2024-10', status: 'completed' },
  { id: '6', category: 'Поддержка', value: 5400, date: '2024-11', status: 'pending' },
  { id: '7', category: 'Разработка', value: 19800, date: '2024-10', status: 'completed' },
  { id: '8', category: 'Поддержка', value: 6100, date: '2024-10', status: 'completed' },
];

export default function Index() {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  const filteredData = mockData.filter((item) => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (dateFilter !== 'all' && item.date !== dateFilter) return false;
    return true;
  });

  const totalValue = filteredData.reduce((sum, item) => sum + item.value, 0);
  const avgValue = filteredData.length > 0 ? totalValue / filteredData.length : 0;
  const activeCount = filteredData.filter((item) => item.status === 'active').length;

  const categories = Array.from(new Set(mockData.map((item) => item.category)));
  const dates = Array.from(new Set(mockData.map((item) => item.date)));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Продажи':
        return 'TrendingUp';
      case 'Маркетинг':
        return 'Target';
      case 'Разработка':
        return 'Code';
      case 'Поддержка':
        return 'Headphones';
      default:
        return 'BarChart3';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-secondary text-secondary-foreground';
      case 'pending':
        return 'bg-accent text-accent-foreground';
      case 'completed':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Активно';
      case 'pending':
        return 'В ожидании';
      case 'completed':
        return 'Завершено';
      default:
        return status;
    }
  };

  const categoryData = categories.map((cat) => {
    const catItems = filteredData.filter((item) => item.category === cat);
    const total = catItems.reduce((sum, item) => sum + item.value, 0);
    return { category: cat, total, count: catItems.length };
  });

  const maxCategoryValue = Math.max(...categoryData.map((d) => d.total), 1);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8 animate-fade-in">
        <header className="space-y-2">
          <h1 className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">
            Аналитический центр
          </h1>
          <p className="text-muted-foreground text-lg">
            Инструмент для анализа и визуализации данных в реальном времени
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="gradient-card border-primary/20 animate-slide-up">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs uppercase tracking-wider">Общая сумма</CardDescription>
              <CardTitle className="text-3xl font-bold text-primary">
                ₽{totalValue.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="TrendingUp" size={16} className="text-secondary" />
                <span>По выбранным фильтрам</span>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-primary/20 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs uppercase tracking-wider">Среднее значение</CardDescription>
              <CardTitle className="text-3xl font-bold text-secondary">
                ₽{Math.round(avgValue).toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="BarChart3" size={16} className="text-secondary" />
                <span>На запись</span>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-primary/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs uppercase tracking-wider">Активные</CardDescription>
              <CardTitle className="text-3xl font-bold text-accent">
                {activeCount}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Activity" size={16} className="text-accent" />
                <span>Записей</span>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-primary/20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs uppercase tracking-wider">Всего записей</CardDescription>
              <CardTitle className="text-3xl font-bold">
                {filteredData.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Database" size={16} className="text-primary" />
                <span>Из {mockData.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/20 animate-scale-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Filter" size={24} className="text-primary" />
                  Динамические фильтры
                </CardTitle>
                <CardDescription className="mt-2">
                  Сегментируйте данные по категориям, датам и статусам
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCategoryFilter('all');
                  setStatusFilter('all');
                  setDateFilter('all');
                }}
                className="gap-2"
              >
                <Icon name="RotateCcw" size={16} />
                Сбросить
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Layers" size={16} className="text-primary" />
                  Категория
                </label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="glow-primary">
                    <SelectValue placeholder="Все категории" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Calendar" size={16} className="text-secondary" />
                  Период
                </label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="glow-secondary">
                    <SelectValue placeholder="Все периоды" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все периоды</SelectItem>
                    {dates.map((date) => (
                      <SelectItem key={date} value={date}>
                        {date}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-accent" />
                  Статус
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все статусы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="active">Активно</SelectItem>
                    <SelectItem value="pending">В ожидании</SelectItem>
                    <SelectItem value="completed">Завершено</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-primary/20 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Icon name="BarChart3" size={20} className="text-primary" />
                Распределение по категориям
              </CardTitle>
              <CardDescription>Визуализация данных по отделам</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryData.map((data, index) => {
                const percentage = (data.total / maxCategoryValue) * 100;
                return (
                  <div key={data.category} className="space-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name={getCategoryIcon(data.category)} size={16} className="text-primary" />
                        <span className="font-medium">{data.category}</span>
                        <Badge variant="outline" className="text-xs">
                          {data.count}
                        </Badge>
                      </div>
                      <span className="font-bold text-foreground">₽{data.total.toLocaleString()}</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-primary rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border-primary/20 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Icon name="PieChart" size={20} className="text-secondary" />
                Статистика по статусам
              </CardTitle>
              <CardDescription>Распределение задач по состояниям</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {(['active', 'pending', 'completed'] as const).map((status, index) => {
                const count = filteredData.filter((item) => item.status === status).length;
                const percentage = filteredData.length > 0 ? (count / filteredData.length) * 100 : 0;
                return (
                  <div key={status} className="space-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(status)}>
                        {getStatusLabel(status)}
                      </Badge>
                      <span className="text-sm font-bold">{count} ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                          status === 'active' ? 'bg-secondary' : status === 'pending' ? 'bg-accent' : 'bg-primary'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/20 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Icon name="Table" size={20} className="text-accent" />
              Детальные данные
            </CardTitle>
            <CardDescription>Все записи по выбранным фильтрам</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredData.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 border border-border/50 hover:border-primary/30 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg gradient-card flex items-center justify-center">
                      <Icon name={getCategoryIcon(item.category)} size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{item.category}</div>
                      <div className="text-sm text-muted-foreground">{item.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusLabel(item.status)}
                    </Badge>
                    <div className="text-xl font-bold text-primary">₽{item.value.toLocaleString()}</div>
                  </div>
                </div>
              ))}
              {filteredData.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Нет данных по выбранным фильтрам</p>
                  <p className="text-sm mt-2">Попробуйте изменить параметры фильтрации</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

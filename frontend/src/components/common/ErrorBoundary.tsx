import { Component, ErrorInfo, ReactNode } from 'react';
import { HiOutlineExclamationCircle, HiOutlineRefresh } from '../../icons/index.js';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 bg-white border border-red-200 rounded-xl shadow-sm my-4 text-center">
          <HiOutlineExclamationCircle className="w-12 h-12 text-red-500 mb-3" />
          <h3 className="text-lg font-semibold text-slate-900 mb-1">Component Render Error</h3>
          <p className="text-sm text-slate-600 mb-4 max-w-md">
            {this.state.error?.message || 'An unexpected error occurred while rendering this widget.'}
          </p>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm rounded-lg transition-colors"
          >
            <HiOutlineRefresh className="w-4 h-4" />
            Reload Widget
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
